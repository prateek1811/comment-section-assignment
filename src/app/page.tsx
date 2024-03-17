"use client"; // This is a client component 👈🏽
import { useEffect, useState } from "react";
import Comment from "./Comment";
import styles from "./page.module.css";
import ViewComment from "./viewComment";

export default function Home() {
  const [userCommentData, setUserCommentData] = useState<any>([]);
  const [replyClickedIndex, setReplyClickedIndex] = useState<number>(-1);
  const [editClickedIndex, setEditClickedIndex] = useState<number>(-1);

  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setUserCommentData(JSON.parse(storedComments));
    }
  }, []);

  useEffect(() => {
    if (userCommentData.length > 0){
    localStorage.setItem('comments', JSON.stringify(userCommentData));
    }
  }, [userCommentData]);

  const date= new Date()
  const onPost = (id: any, userName: any, comment: any) => {    
    const data = {
      id: Math.random(),
      user: userName,
      commentData: comment,
      date: date,
      replies: [],
    };
    setUserCommentData((previous: any) => [...previous, data]);
  };

  const onReply = (data: number) => {
    setReplyClickedIndex(data);
  };
  const onParentEdit = (id: number, childId: any) => {
    setEditClickedIndex(id);
  };
  const onChildEdit = (id: number, childId: any) => {
    setEditClickedIndex(childId);
  };

  const handleReply = (id: any, userName: any, comment: any) => {
    const data = {
      id: Math.random(),
      user: userName,
      commentData: comment,
      date: date,
    };
    const updatedComments = userCommentData.map((comment: any) => {
      if (comment.id === id) {
        return {
          ...comment,
          replies: [...comment.replies, data],
        };
      }
      return comment;
    });
    setUserCommentData(updatedComments);
    setReplyClickedIndex(-1);
  };

  const handleEdit = (id: any, userName: any, comment: any, childId: any) => {
    console.log(id, childId);
    const updatedComment = [...userCommentData];
    updatedComment.forEach((value: any) => {
      if (value.id === id && typeof childId === "undefined") {
        value.commentData = comment;
      } else if (value.id === id) {
        value.replies?.map((item: any) => {
          if (item.id === childId) {
            item.commentData = comment;
          }
        });
      }
    });
    setEditClickedIndex(-1);
  };

  const removeComment = (id: any, childId: any) => {
    console.log("childId",childId)
    if(childId){
      const newComment = userCommentData.map((comment: any, index: number) => {
        if (comment.id === id) { 
          const removeChildComment = comment.replies.filter(
            (data: any) => data.id !== childId);
          console.log("removeChildComment",removeChildComment);
          return {
            ...comment,
            replies: removeChildComment,
          };     
        }
        return comment      
      })
      console.log(newComment)
      setUserCommentData(newComment)
    }
    else {
      const newComment=userCommentData.filter((comment:any) => comment.id !== id);
      setUserCommentData(newComment);
    }
  };
  console.log("userCommentData", userCommentData);

  const sortByDate = (sortBy:any) => {
    if(sortBy==='asc'){
    const sortedComments = [...userCommentData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setUserCommentData(sortedComments);
    }
    else {
      const sortedComments = [...userCommentData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setUserCommentData(sortedComments);
    }
  };
  
  return (
    <main className={styles.main}>
      <Comment commentHeading="Comment" onPost={onPost} />

      {Array(userCommentData) && userCommentData.length>0
        ? userCommentData?.map((item: any, index: number) => (
            <>
              <ViewComment
                isReplyVisible={true}
                key={index}
                data={item}
                index={item.id}
                onDelete={removeComment}
                onReply={onReply}
                onEdit={onParentEdit}
                sortByDate={sortByDate}
              />
              {replyClickedIndex === item.id && (
                <div className={styles.replySection}>
                  <Comment
                    commentHeading="Reply"
                    id={item.id}
                    onPost={handleReply}
                  />
                </div>
              )}
              {editClickedIndex === item.id && (
                <div className={styles.replySection}>
                  <Comment
                    commentHeading="Edit"
                    id={item.id}
                    data={item}
                    isNameDisabled={true}
                    onPost={handleEdit}
                  />
                </div>
              )}
              {item.replies?.map((reply: any, id: number) => (
                <>
                  <div className={styles.replySection}>
                    <ViewComment
                      isReplyVisible={false}
                      childId={reply.id}
                      key={id}
                      data={reply}
                      index={item.id}
                      onDelete={removeComment}
                      onReply={onReply}
                      onEdit={onChildEdit}
                    />
                  </div>

                  {editClickedIndex === reply.id && (
                    <div className={styles.replySection}>
                      <Comment
                        commentHeading="Edit"
                        childId={reply.id}
                        id={item.id}
                        data={reply}
                        isNameDisabled={true}
                        onPost={handleEdit}
                      />
                    </div>
                  )}
                </>
              ))}
            </>
          ))
        : <></>}
    </main>
  );
}
