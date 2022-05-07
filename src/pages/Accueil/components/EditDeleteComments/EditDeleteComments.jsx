import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../../../actions/post.actions";
import { UidContext } from "../../../../components/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditDeleteComments = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [message, setText] = useState("");
  const dispatch = useDispatch();
  const uid = useContext(UidContext);


  const handleEdit = (e) => {
    e.preventDefault();

    if (message) {
      dispatch(editComment(postId, comment.id, message));
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () => dispatch(deleteComment(postId, comment.id));

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.userId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.userId]);

  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <FontAwesomeIcon className="icons" icon="fa-solid fa-pen-to-square" />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <br />
          <input
            type="text"
            name="message"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.message}
          />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                  handleDelete();
                }
              }}
            >
              <FontAwesomeIcon className="icons" icon="fa-solid fa-trash" alt="delete"/>
            </span>
            <input type="submit" value="Valider modification" />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComments;
