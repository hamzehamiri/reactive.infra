import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
from transformers import GPT2LMHeadModel, GPT2Tokenizer
from torch.utils.data import Dataset, DataLoader
import torch

# --- بخش 1: آماده‌سازی داده‌ها ---
# فرض کنید داده‌ها به‌صورت زیر از پایگاه‌داده استخراج شده‌اند:
documents = [
    "شرایط بازگشت کالا چیست؟",
    "ما تا 30 روز کالاهای خریداری شده را می‌پذیریم.",
    "روش‌های پرداخت شما چیست؟",
    "ما پرداخت با کارت اعتباری، پی پال و انتقال بانکی را می‌پذیریم."
    # ... سایر اسناد
]

# --- بخش 2: مدل‌سازی و تبدیل به بردارها ---
# مدل sentence-transformer را برای تبدیل اسناد به بردارها بارگیری می‌کنیم.
embedding_model = SentenceTransformer('all-mpnet-base-v2')

# تبدیل اسناد به بردار
document_embeddings = embedding_model.encode(documents)

# --- بخش 3: ایندکس‌گذاری با FAISS ---
# ابعاد embedding در مدل MPNet برابر با 768 است
dimension = 768
faiss_index = faiss.IndexFlatL2(dimension)  # ساخت ایندکس بر اساس معیار L2
faiss_index.add(document_embeddings)  # افزودن بردارها به ایندکس

# تابع برای جستجوی اسناد مرتبط
def retrieve_documents(query, top_k=3):
    query_embedding = embedding_model.encode([query])
    distances, indices = faiss_index.search(query_embedding, top_k)
    retrieved_docs = [documents[i] for i in indices[0]]
    return retrieved_docs

# --- بخش 4: تولید پاسخ با GPT-2 ---
# بارگیری مدل GPT-2 برای تولید پاسخ
gpt2_tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
gpt2_model = GPT2LMHeadModel.from_pretrained('gpt2')

# تابع برای تولید پاسخ
def generate_response(query, retrieved_docs):
    # ترکیب پرسش و اسناد بازیابی‌شده
    input_text = query + "\n" + "\n".join(retrieved_docs)

    # توکن‌سازی ورودی
    inputs = gpt2_tokenizer(input_text, return_tensors="pt")

    # تولید پاسخ با استفاده از مدل GPT-2
    outputs = gpt2_model.generate(inputs['input_ids'], max_length=150)

    # تبدیل پاسخ به متن
    generated_text = gpt2_tokenizer.decode(outputs[0], skip_special_tokens=True)
    return generated_text

# --- بخش 5: آموزش مدل (اختیاری) ---
class CustomDataset(Dataset):
    def __init__(self, texts, tokenizer):
        self.texts = texts
        self.tokenizer = tokenizer

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, idx):
        text = self.texts[idx]
        inputs = self.tokenizer(text, return_tensors="pt", max_length=512, truncation=True, padding="max_length")
        return inputs.input_ids[0], inputs.input_ids[0]  # input_ids as target for language modeling

# داده‌های آموزشی فرضی
train_texts = [
    "سوال: شرایط بازگشت کالا چیست؟ پاسخ: ما تا 30 روز کالاهای خریداری شده را می‌پذیریم.",
    "سوال: روش‌های پرداخت شما چیست؟ پاسخ: ما پرداخت با کارت اعتباری و پی پال را می‌پذیریم."
]

# ایجاد مجموعه داده سفارشی
train_dataset = CustomDataset(train_texts, gpt2_tokenizer)

# تعریف DataLoader
train_loader = DataLoader(train_dataset, batch_size=2, shuffle=True)

# تابع آموزش مدل
def train_model(model, data_loader, epochs=3):
    model.train()
    optimizer = torch.optim.AdamW(model.parameters(), lr=5e-5)

    for epoch in range(epochs):
        for batch in data_loader:
            optimizer.zero_grad()
            inputs, labels = batch
            outputs = model(inputs, labels=labels)
            loss = outputs.loss
            loss.backward()
            optimizer.step()
            print(f"Epoch {epoch+1}, Loss: {loss.item()}")

# آموزش مدل (اختیاری)
train_model(gpt2_model, train_loader)

# --- استفاده از الگوریتم RAG ---
query = "روش‌های پرداخت شما چیست؟"
retrieved_docs = retrieve_documents(query)
response = generate_response(query, retrieved_docs)
print(f"پرسش: {query}")
print(f"پاسخ: {response}")