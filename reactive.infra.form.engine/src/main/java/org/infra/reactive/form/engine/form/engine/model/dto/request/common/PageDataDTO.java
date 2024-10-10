package org.infra.reactive.form.engine.form.engine.model.dto.request.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.RecordModelDTO;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageDataDTO implements Serializable {
    private PagingDTO pagingDTO;
    private RecordModelDTO recordModelDTO;
}
