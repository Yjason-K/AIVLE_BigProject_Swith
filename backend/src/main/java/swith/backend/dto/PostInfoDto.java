package swith.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import swith.backend.domain.Comment;
import swith.backend.domain.Post;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class PostInfoDto{


    private Long postId; //POST의 ID
    private String title;//제목
    private String content;//내용
    private String filePath;//업로드 파일 경로
    private UserInfoDto writerDto;//작성자에 대한 정보
    private List<CommentInfoDto> commentInfoDtoList;//댓글 정보들


    public PostInfoDto(Post post) {

        this.postId = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();

        this.writerDto = new UserInfoDto(post.getUser());

        List<Comment> commentList = post.getComments();
        this.commentInfoDtoList = commentList.stream().map(CommentInfoDto::new).collect(Collectors.toList());
    }
}