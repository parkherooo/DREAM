package com.dita.dreambackend.style.dto;

import com.dita.dreambackend.style.entity.StyleEntity;
import com.dita.dreambackend.user.entity.UserEntity;
import lombok.*;

import javax.swing.text.Style;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor // 기본 생성자
@AllArgsConstructor // 모든 필드를 매개변수로 하는 생성자
public class StyleDTO {
    private int st_num;
    private String user_id;
    private String tags;
    private String st_content;
    private String image;
    private int ht_count;
    private LocalDateTime st_date;
    private String hashtag;

    public static StyleDTO toStyleDTO(StyleEntity styleEntity) {
        StyleDTO styleDTO = new StyleDTO();
        styleDTO.setSt_num(styleEntity.getSt_num());
        styleDTO.setUser_id(styleEntity.getUser_id().getUser_id());
        styleDTO.setTags(styleEntity.getTags());
        styleDTO.setSt_content(styleEntity.getSt_content());
        styleDTO.setImage(styleEntity.getImage());
        styleDTO.setHt_count(styleEntity.getHt_count());
        styleDTO.setSt_date(styleEntity.getSt_date());
        styleDTO.setHashtag(styleEntity.getHashtag());
        return styleDTO;
    }

}
