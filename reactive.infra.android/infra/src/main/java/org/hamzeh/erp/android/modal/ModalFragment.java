package org.hamzeh.erp.android.modal;

import android.app.Dialog;
import android.os.Bundle;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.DialogFragment;

public class ModalFragment extends DialogFragment {
    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        AlertDialog.Builder builder = new AlertDialog.Builder(requireContext());
        builder.setMessage("Your message here")
                .setTitle("Modal Title")
                .setPositiveButton("OK", (dialog, id) -> {
                    // Handle OK click
                })
                .setNegativeButton("Cancel", (dialog, id) -> {
                    // Handle Cancel click
                });
        return builder.create();
    }
}
