package swith.backend.service;

import org.springframework.data.domain.Pageable;
import swith.backend.cond.PostSearchCondition;
import swith.backend.dto.PostInfoDto;
import swith.backend.dto.PostPagingDto;
import swith.backend.dto.PostSaveDto;
import swith.backend.dto.PostUpdateDto;
import swith.backend.exception.FileException;


public interface PostService {
    /**
     * 게시글 등록
     */
    void save(PostSaveDto postSaveDto) throws FileException;

    /**
     * 게시글 수정
     */
    void update(Long id, PostUpdateDto postUpdateDto);

    /**
     * 게시글 삭제
     */
    void delete(Long id);

    /**
     * 게시글 1개 조회
     */
    PostInfoDto getPostInfo(Long id);

    /**
     * 검색 조건에 따른 게시글 리스트 조회 + 페이징
     */
    PostPagingDto getPostList(Pageable pageable, PostSearchCondition postSearchCondition);

}
