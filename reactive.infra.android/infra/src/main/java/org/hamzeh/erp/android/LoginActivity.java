package org.hamzeh.erp.android;

import android.os.Bundle;
import android.view.View;
import android.widget.*;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentManager;
import org.hamzeh.erp.android.databinding.LoginActivityBinding;
import org.hamzeh.erp.android.modal.CustomDialog;

public class LoginActivity extends AppCompatActivity {
    private LoginActivityBinding binding;
    private FragmentManager fragmentManager;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = LoginActivityBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        this.fragmentManager = getSupportFragmentManager();

        ScrollView scrollView = new ScrollView(this);

        LinearLayout linearLayout = new LinearLayout(this);
        linearLayout.setBackgroundColor(154265);
        linearLayout.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT));
        linearLayout.setOrientation(LinearLayout.VERTICAL);

        for (int i = 0; i < 56; i++) {
            Button textView2 = new Button(this);
            textView2.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    showCustomDialog();
//                    ModalFragment modalFragment = new ModalFragment();
//                    modalFragment.show(fragmentManager, "modal_tag");
                }
            });
            textView2.setText("Item " + i);
            linearLayout.addView(textView2);
        }

        scrollView.addView(linearLayout, new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT));

        binding.getRoot().addView(scrollView);
    }

    private void showCustomDialog() {
        TextView textView = new TextView(this);
        textView.setText("This is a dynamic text view");

        EditText editText = new EditText(this);
        editText.setHint("Enter something");

        CheckBox checkBox = new CheckBox(this);
        checkBox.setText("Remember me");

        LinearLayout contentLayout = new LinearLayout(this);
        contentLayout.setOrientation(LinearLayout.VERTICAL);
        contentLayout.setPadding(16, 16, 16, 16);
        contentLayout.addView(textView);
        contentLayout.addView(editText);
        contentLayout.addView(checkBox);

        CustomDialog dialog = new CustomDialog(this);
        dialog.setTitle("Dynamic Content Example");
        dialog.setContent(contentLayout);
        dialog.show();
    }
}
