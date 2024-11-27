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
    private String title;
    private String st_content;
    private String image;
    private int ht_count;
    private LocalDateTime st_date;
    private String hashtag;

    public static StyleDTO toStyleDTO(StyleEntity styleEntity) {
        StyleDTO styleDTO = new StyleDTO();
        styleDTO.setStNum(styleEntity.getStNum());
        styleDTO.setUserId(styleEntity.getUserId().getUserId());
        styleDTO.setTitle(styleEntity.getTitle());
        styleDTO.setStContent(styleEntity.getStContent());
        styleDTO.setImage(styleEntity.getImage());
        styleDTO.setHtCount(styleEntity.getHtCount());
        styleDTO.setStDate(styleEntity.getStDate());
        styleDTO.setHashtag(styleEntity.getHashtag());
        return styleDTO;
    }

}
