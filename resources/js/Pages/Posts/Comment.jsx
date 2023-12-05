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
    <div className="bg-cyan-900 text-white p-4">
  <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
    <label htmlFor="comment">Isi Komentar:</label>
    <input
      type="text"
      id="comment"
      name="comment"
      value={data.comment}
      onChange={(e) => setData("comment", e.target.value)}
      className="p-2 border border-white rounded text-black"
    />

    <button
      type="submit"
      className="bg-blue-500 text-white py-2 px-4 rounded"
    >
      Komentar
    </button>
  </form>
</div>

  );
};

export default Comment;
