import Icon from "awesome-react-icons/lib/cjs/Icon";
import styles from "./page.module.css";
import { useState } from "react";
import { format } from "date-fns";

export default function ViewComment(props: any) {
  const {
    childId,
    isReplyVisible,
    data,
    index,
    onDelete,
    onReply,
    onEdit,
    sortByDate,
  } = props;
  const [replyId, setReplyId] = useState(childId);
  const [sortBy, setSortBy] = useState("asc");

  const reply = () => {
    onReply(index);
    setReplyId(undefined);
  };
  const edit = () => {
    onEdit(index, childId);
    setReplyId(undefined);
  };
  const getDate = (date: any) => {
    return format(new Date(date), "dd MMM yyyy");
  };
  

  return (
    <div className={styles.viewCommentSection} key={childId}>
      <div className={styles.date}>{getDate(data.date)}</div>
      <div className={styles.commentedByDiv}>{data.user}</div>
      <div className={styles.savedCommentDiv}>
        <p>{data.commentData}</p>
      </div>
      <div>
        {" "}
        {isReplyVisible && (
          <button
            className={styles.replyEditButton}
            type="button"
            onClick={reply}
          >
            Reply
          </button>
        )}
        <button className={styles.replyEditButton} type="button" onClick={edit}>
          Edit
        </button>
      </div>
      <div className={styles.icondiv} onClick={() => onDelete(index, childId)}>
        <Icon name="trash" size={15} />
      </div>
    </div>
  );
}
