"use client"; // This is a client component 👈🏽
import { useState } from "react";
import styles from "./page.module.css";

const Comment=(props: any)=> {
const {commentHeading,childId,id,data, isNameDisabled,onPost} =props;

const[userName, setUserName]=useState(data?.user)
const[comment, setComment]=useState(data?.commentData)
const[replyId,setReplyId]=useState(childId)
const[error,setError]=useState('')

const handleName=(value: any)=>{
setUserName(value)
setError('')
}
const handleComment=(value: any)=>{
  setComment(value)
  setError('')
  }
  const handlePost=()=>{
    if(!comment || !userName) {
      setError('Please enter name as well as comment to Post your data')
    }
    else {
    onPost(id,userName,comment,replyId)
    setComment('')
    setUserName('')
    setReplyId(undefined)
    }
  }
  //console.log(childId)

  return (
   
      <div className={styles.commentdiv}>
        <div className={styles.error}>
          <p>{error}</p>
        </div>
        <p className={styles.commentHeading}>{commentHeading}</p>
        <div className={styles.nameSection}>
       <input className={styles.name} disabled={isNameDisabled} type='text' name='name' placeholder="Name" value={userName} onChange={(e: any)=>{handleName(e.target.value)}} />
       </div>
       <div className={styles.commentSection}>
        <textarea className={styles.comment} name='comment' value={comment} placeholder="Comment" onChange={(e: any)=>{handleComment(e?.target.value)}}/>
       </div>
       <div className={styles.postButtonSection}>
        <button className={styles.postButton} type="button" onClick={handlePost}>POST</button>
       </div>
      </div>
  );
}
export default Comment;
