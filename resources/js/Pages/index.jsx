import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import Posting from "./Posts/Posting";
import Comment from "./Posts/Comment";
import '@/Pages/global.css';

export default function Index({ auth, user, postings }) {
  const [showForm, setShowForm] = useState(false);
  const [komenForm, setKomenForm] = useState(false);
  const [blurBackground, setBlurBackground] = useState(false);
  const [postingId, setPostingId] = useState(null);
  const [loadedPostings, setLoadedPostings] = useState([]);

  console.log(postings);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/coba');
        const data = await response.json();
        console.log(data);
        setLoadedPostings(data.posting);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const openForm = () => {
    setShowForm(true);
    setBlurBackground(true);
  };

  const bukaForm = (postId) => {
    setKomenForm(true);
    setBlurBackground(true);
    setPostingId(postId);
  };

  const tutupForm = () => {
    setKomenForm(false);
    setBlurBackground(false);
  };

  const closeForm = () => {
    setShowForm(false);
    setBlurBackground(false);
  };

  const toggleComments = (postId) => {
    setLoadedPostings((prevPostings) =>
      prevPostings.map((post) =>
        post.id === postId ? { ...post, showComments: !post.showComments } : post
      )
    );
  };

  return (
    <div>
      <div style={{ backgroundColor: "", marginTop: "5px", marginLeft: "5px" }}>
        {auth.user ? (
          <>
            <Link
              href="/dashboard"
              as="button"
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "5px 10px",
                marginRight: "10px",
                borderRadius: "5px",
                textDecoration: "none",
              }}
            >
              dashboard
            </Link>
            <Link
              href="/profile"
              as="button"
              style={{
                backgroundColor: "green",
                color: "white",
                marginRight: "10px",
                padding: "5px 10px",
                borderRadius: "5px",
                textDecoration: "none",
              }}
            >
              Profil
            </Link>
            <Link
              href="/logout"
              method="post"
              as="button"
              style={{
                backgroundColor: "red",
                color: "white",
                marginRight: "10px",
                padding: "5px 10px",
                borderRadius: "5px",
                textDecoration: "none",
              }}
            >
              logout
            </Link>
            Hallo !!! {auth.user.name}
          </>
        ) : (
          <>
            <Link
              href="/login"
              as="button"
              style={{
                backgroundColor: "green",
                color: "white",
                marginRight: "10px",
                padding: "5px 10px",
                borderRadius: "5px",
                textDecoration: "none",
              }}
            >
              Login
            </Link>
            <Link
              href="/register"
              as="button"
              style={{
                backgroundColor: "green",
                color: "white",
                marginRight: "10px",
                padding: "5px 10px",
                borderRadius: "5px",
                textDecoration: "none",
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>

      <div style={{ marginLeft: "5px", marginTop: "5px" }}>
        <h1>Halaman Utama</h1>
      </div>

      {showForm && (
        <div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.3)", zIndex: "998", backdropFilter: blurBackground ? "blur(5px)" : "none" }}>
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "20px", borderRadius: "8px", zIndex: "999" }}>
            <Posting closeForm={closeForm} />
          </div>
          <button onClick={closeForm} style={{ backgroundColor: "red", color: "white", padding: "5px 10px", borderRadius: "5px", textDecoration: "none" }}>
            tutup
          </button>
        </div>
      )}

      {komenForm && (
        <div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.3)", zIndex: "998", backdropFilter: blurBackground ? "blur(5px)" : "none" }}>
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "20px", borderRadius: "8px", zIndex: "999" }}>
            <Comment closeForm={tutupForm} postId={postingId} />
          </div>
          <button onClick={tutupForm} style={{ backgroundColor: "red", color: "white", padding: "5px 10px", borderRadius: "5px", textDecoration: "none" }}>
            tutup
          </button>
        </div>
      )}

      <button onClick={openForm} style={{ backgroundColor: "green", color: "white", padding: "5px 10px", borderRadius: "5px", textDecoration: "none" }}>
        Mulai Bikin Postingan
      </button>

      <div>
        <h1>
          <center>Semua Postingan</center>
        </h1>

        <div className="card-container">
  {loadedPostings && Array.isArray(loadedPostings) && loadedPostings.length > 0 ? (
    loadedPostings.map((post) => (
      <div key={post.id} className="card">
        <h2>{post.judul}</h2>
        <p className="truncate-text" style={{ maxHeight: "3em", overflow: "hidden", marginBottom: "10px" }}>{post.isi}</p>
        <span>{post.komentars.length} Comment{post.komentars.length !== 1 ? 's' : ''}</span>
        <div className="comment-button-container">
          <button onClick={() => bukaForm(post.id)} style={{ backgroundColor: 'red' }} className="comment-button">
            Komentar
          </button>
          <button onClick={() => toggleComments(post.id)} style={{ backgroundColor: 'blue', color: 'white', marginTop: '5px' }}>
            {post.showComments ? 'Hide Comments' : 'Show Comments'}
          </button>
        </div>
        {post.showComments && (
          <div>
            {post.komentars && post.komentars.length > 0 ? (
              <ul>
                {post.komentars.map((komentar) => (
                  <li key={komentar.id}>{komentar.comment}</li>
                ))}
              </ul>
            ) : (
              <p>Tidak ada komentar.</p>
            )}
          </div>
        )}
        {komenForm && post.id === postingId && (
          <div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.3)", zIndex: "998", backdropFilter: blurBackground ? "blur(5px)" : "none" }}>
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "20px", borderRadius: "8px", zIndex: "999" }}>
              <Comment closeForm={tutupForm} postId={post.id} />
            </div>
            <button onClick={tutupForm} style={{ backgroundColor: "red", color: "white", padding: "5px 10px", borderRadius: "5px", textDecoration: "none" }}>
              tutup
            </button>
          </div>
        )}
      </div>
    ))
  ) : (
    <p>Tidak ada postingan.</p>
  )}
</div>

      </div>
    </div>
  );
}
