package swith.backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import swith.backend.domain.Post;
import swith.backend.domain.PostSearch;
import swith.backend.dto.*;
import swith.backend.exception.PostException;
import swith.backend.repository.PostRepository;
import swith.backend.service.PostService;
import swith.backend.service.S3Service;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

import static swith.backend.exception.PostExceptionType.POST_NOT_FOUND;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
@Slf4j
public class PostController {

    private final PostService postService;
    private final S3Service s3Service;
    private final PostRepository postRepository;

    /**
     * 게시글 등록
     */
//    @PostMapping("/new")
//    @ResponseStatus(HttpStatus.CREATED)
//    public void register(@Valid @RequestBody PostSaveDto postSaveDto,
//                         @RequestPart(value = "files") List<MultipartFile> multipartFiles) {
//        Post post = Post.builder()
//                .title(postSaveDto.getTitle())
//                .content(postSaveDto.getContent())
//                .build();
//
//        postService.register(post);
//    }

    @PostMapping(value = "/new", consumes = {"multipart/form-data"})
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@Valid @RequestPart(value = "data") PostSaveDto postSaveDto,
                         @RequestPart(value = "files", required = false) List<MultipartFile> multipartFiles) {
        Post post = Post.builder()
                .title(postSaveDto.getTitle())
                .content(postSaveDto.getContent())
                .build();

        postService.register(post);

        if (multipartFiles != null && !multipartFiles.isEmpty()) {
            s3Service.uploadFiles(post.getId(), "image", multipartFiles);
        }
    }

    /**
     * 게시글 수정
     */
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/edit/{postId}")
    public void update(@PathVariable("postId") Long postId,
                       @RequestBody PostUpdateDto postUpdateDto) {

        postService.update(postId, postUpdateDto);
    }


    /**
     * 게시글 조회
     */
//    @GetMapping("/post/{postId}")
//    public ResponseEntity getInfo(@PathVariable("postId") Long postId) {
//        return ResponseEntity.ok(postService.getPostInfo(postId));
//    }

    @GetMapping("/post/{postId}")
    public ResponseEntity getInfo(@PathVariable("postId") Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(POST_NOT_FOUND));
        post.updateSearchCount(post.getSearchCount());
        postRepository.save(post);
        return ResponseEntity.ok(postService.getPostInfo(postId));
    }

    /**
     * 게시글 삭제
     */
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/post/{postId}")
    @Transactional
    public void delete(@PathVariable("postId") Long postId) {

        postService.delete(postId);
    }


    /**
     * 게시글 페이징 조회
     */
    @GetMapping("/postList")
    public Page<PostsRespondDto> getPostList(@RequestParam("page") int page) {
        Page<Post> posts = postService.getPostList(page, 10);

        log.info("전체 페이지 번호 : {}", posts.getTotalPages());
        log.info("전체 데이터 수 : {}", posts.getTotalElements());


        List<PostsRespondDto> result = posts.stream()
                .map(p -> new PostsRespondDto(p,posts.getTotalPages()))
                .collect(Collectors.toList());


        return new PageImpl<>(result);
    }

    /**
     * 게시글 전체 페이지 번호와 전체 데이터 수
     */
    @GetMapping("/pageNumber")
    public PageNumberDto pageNumber() {
        Page<Post> posts = postService.getPageList(10);
        int totalPages = posts.getTotalPages();
        long totalElements = posts.getTotalElements();

        return new PageNumberDto(totalPages, totalElements);
    }

    @GetMapping("/search")
    public Page<SearchRespondDto> getCondList(@RequestParam("page") int page,@ModelAttribute PostSearch postSearch){
        log.info("{},{}",postSearch.getTitle(),postSearch.getWriter());
        Page<Post> posts = postService.PostSearch(postSearch,page,2);
        log.info("total:{}",posts.getTotalPages());
        log.info("postsearch {}, {}",postSearch.getWriter(),postSearch.getTitle());

        List<SearchRespondDto> result = posts.stream()
                .map(p -> new SearchRespondDto(p))
                .collect(Collectors.toList());
        return new PageImpl<>(result);

    }
}