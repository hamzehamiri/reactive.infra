package org.infra.reactive.web.formengine.modules.process.services;

import org.infra.reactive.form.engine.form.engine.model.dto.response.process.CoreProcessResponseDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDTO;
import org.jetbrains.annotations.NotNull;

import java.util.Iterator;
import java.util.List;

public class CoreTableDDLServiceIterator implements Iterable<CoreProcessResponseDTO> {

    private final List<CoreTableDTO> coreTableDTOList;

    public CoreTableDDLServiceIterator(List<CoreTableDTO> coreTableDTOList) {
        this.coreTableDTOList = coreTableDTOList;
    }

    @NotNull
    @Override
    public Iterator<CoreProcessResponseDTO> iterator() {
        return new CoreTableDDLProcessIterator(coreTableDTOList);
    }

    public static class CoreTableDDLProcessIterator implements Iterator<CoreProcessResponseDTO> {

        private final List<CoreTableDTO> coreTableDTOList;

        public CoreTableDDLProcessIterator(List<CoreTableDTO> coreTableDTOList) {
            this.coreTableDTOList = coreTableDTOList;
        }

        @Override
        public boolean hasNext() {
            return false;
        }

        @Override
        public CoreProcessResponseDTO next() {
            return null;
        }
    }
}
