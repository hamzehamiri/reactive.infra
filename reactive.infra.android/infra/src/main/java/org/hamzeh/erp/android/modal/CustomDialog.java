package org.hamzeh.erp.android.modal;

import android.app.Dialog;
import android.content.Context;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.LinearLayout;
import android.widget.TextView;
import org.hamzeh.erp.android.R;

public class CustomDialog extends Dialog {
    private LinearLayout contentLayout;
    private TextView titleTextView;

    public CustomDialog(Context context) {
        super(context);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.custom_dialog);

        Window window = getWindow();
        WindowManager.LayoutParams lp = new WindowManager.LayoutParams();
        lp.copyFrom(window.getAttributes());
        lp.width = WindowManager.LayoutParams.MATCH_PARENT;
        lp.height = WindowManager.LayoutParams.WRAP_CONTENT;
        window.setAttributes(lp);

        contentLayout = findViewById(R.id.dynamic);
        titleTextView = findViewById(R.id.title);
    }

    public void setTitle(String title) {
        titleTextView.setText(title);
    }

    public void setContent(View view) {
        contentLayout.addView(view);
    }
}
