package com.dita.dreambackend.style.dto;

import com.dita.dreambackend.style.entity.CommentEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    private Long cm_num;
    private Long st_num;
    private String user_id;
    private String cm_content;
    private LocalDateTime cm_date;

    public static CommentDTO toCommentDTO(CommentEntity commentEntity) {
        if (commentEntity == null) return null;

        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setCm_num(commentEntity.getCm_num());
        commentDTO.setSt_num((long) commentEntity.getStyle().getSt_num());
        commentDTO.setUser_id(commentEntity.getUser().getUser_id());
        commentDTO.setCm_content(commentEntity.getCm_content());
        commentDTO.setCm_date(commentEntity.getCm_date());

        return commentDTO;
    }
}
