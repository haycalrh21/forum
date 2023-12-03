// Comment.jsx
import React from "react";
import { useForm } from "@inertiajs/inertia-react";

const Comment = ({ closeForm, postId }) => {
  const { data, setData, post, processing } = useForm({
    comment: "",
    postid: postId,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/komentar", data, {
      onSuccess: () => {
        closeForm();
      },
    });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Komentar</label>
          <input
            type="text"
            name="comment"
            value={data.comment}
            onChange={(e) => setData("comment", e.target.value)}
          />

          <button type="submit">Komentar</button>
        </form>
      </div>
    </div>
  );
};

export default Comment;
