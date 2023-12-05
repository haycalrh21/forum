import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import Posting from "../Posts/Posting";
import Comment from "../Posts/Comment";
import { InertiaLink } from "@inertiajs/inertia-react";
import "@/Pages/global.css";

export default function Index({ auth, user, posting,totalPosts }) {
    const [showForm, setShowForm] = useState(false);
    const [komenForm, setKomenForm] = useState(false);
    const [originalPostings, setOriginalPostings] = useState([]);
    const [blurBackground, setBlurBackground] = useState(false);
    const [postingId, setPostingId] = useState(null);
    const [loadedPostings, setLoadedPostings] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    // console.log("user id yang keberapa?", auth.user.id);
    // loadedPostings.forEach(post => console.log(`Post ID ${post.id} - User ID: ${post.userId}`));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/coba");
                const data = await response.json();
                console.log("Received data:", data);
                // Simpan data asli ke state originalPostings
                setOriginalPostings(data.posting);
                // Inisialisasi loadedPostings dengan data asli
                setLoadedPostings(data.posting);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const searchPostings = () => {
        if (originalPostings) {
            if (searchTerm.trim() === "") {
                // Jika kolom pencarian kosong, kembalikan ke originalPostings
                setLoadedPostings(originalPostings.slice()); // Gunakan slice() untuk membuat salinan array
            } else {
                // Jika kolom pencarian diisi, lakukan filter
                const filteredPostings = originalPostings.filter(
                    (post) =>
                        post.judul
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                        post.isi
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                );
                setLoadedPostings(filteredPostings);
            }
        }
    };

    useEffect(() => {
        searchPostings();
    }, [searchTerm]);

    const hapusPosting = async (postId) => {
        try {
            // Gantilah URL dengan URL endpoint backend yang sesuai
            const response = await fetch(`/posts/${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    // Jika diperlukan, tambahkan header otorisasi atau token
                    // 'Authorization': `Bearer ${accessToken}`
                },
            });

            if (response.ok) {
                // Hapus posting dari daftar loadedPostings
                setLoadedPostings((prevPostings) =>
                    prevPostings.filter((post) => post.id !== postId)
                );
                console.log(`Posting dengan ID ${postId} berhasil dihapus`);
            } else {
                console.error(`Gagal menghapus posting dengan ID ${postId}`);
            }
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
        }
    };
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
                post.id === postId
                    ? { ...post, showComments: !post.showComments }
                    : post
            )
        );
    };


    const sortedPostings = loadedPostings.sort(
        (a, b) =>
            new Date(b.created_at) -
            new Date(a.created_at)
    );

    useEffect(() => {
        // Menggunakan API browser untuk mengubah URL tanpa reload halaman
        window.history.pushState({}, null, `?page=${currentPage}`);
    }, [currentPage]);
    // Calculate the indexes of the current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedPostings.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate the number of pages
    const pageNumbers = Math.ceil(sortedPostings.length / postsPerPage);


    return (
        <div className="bg-cyan-900 text-white">
            <div style={{}}>
                {auth.user ? (
                    <>

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

            <div
                style={{ marginLeft: "5px", marginTop: "5px" }}
                className="bg-base-500"
            ></div>

            {showForm && (
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        zIndex: "998",
                        backdropFilter: blurBackground ? "blur(5px)" : "none",
                    }}
                >
                    <div
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            width: "50%",
                            height: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "white",
                            padding: "30px",
                            borderRadius: "8px",
                            zIndex: "999",
                        }}
                    >
                        <Posting closeForm={closeForm} />
                    </div>
                    <button
                        onClick={closeForm}
                        style={{
                            backgroundColor: "red",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            textDecoration: "none",
                        }}
                    >
                        tutup
                    </button>
                </div>
            )}

            {komenForm && (
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        zIndex: "998",
                        backdropFilter: blurBackground ? "blur(5px)" : "none",
                    }}
                >
                    <div
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "8px",
                            zIndex: "999",
                        }}
                    >
                        <Comment closeForm={tutupForm} postId={postingId} />
                    </div>
                    <button
                        onClick={tutupForm}
                        style={{
                            backgroundColor: "red",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            textDecoration: "none",
                        }}
                    >
                        tutup
                    </button>
                </div>
            )}

            <button
                onClick={openForm}
                style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    textDecoration: "none",
                }}
            >
                Mulai Bikin Postingan
            </button>

            <div>
                <h1 className="text-5xl mb-4">
                    <center>Semua Postingan</center>
                </h1>
                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <input
                        className="text-black"
                        type="text"
                        placeholder="Cari postingan..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: "5px",
                            marginRight: "10px",
                            borderRadius: "5px",
                        }}
                    />
                    <button
                        onClick={() => {
                            searchPostings();
                        }}
                        style={{
                            backgroundColor: "green",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            textDecoration: "none",
                        }}
                    >
                        Cari
                    </button>
                </div>
                {/* Display User ID */}

                {/* <p>User ID: {auth.user.id}</p> */}

                <div className="card-container" style={{ width: "100%" }}>
                {currentPosts &&
                    Array.isArray(currentPosts) &&
                    currentPosts.length > 0 ? (
                        currentPosts.map((post) => (
                                <div key={post.id} className="card">
                                    <h2 className="text-2xl font-bold">
                                        JUDUL
                                    </h2>

                                    <h2>{post.judul}</h2>
                                    <h2 className="text-2xl font-bold">ISI</h2>

                                    <p>{post.isi}</p>
                                    <span>
                                        {post.komentars.length} Comment
                                        {post.komentars.length !== 1 ? "s" : ""}
                                    </span>
                                    <div className="comment-button-container">
                                        <button
                                            onClick={() => bukaForm(post.id)}
                                            style={{
                                                backgroundColor: "green",
                                                color: "white",
                                                padding: "5px 10px",
                                                marginRight: "10px",
                                                borderRadius: "5px",
                                                textDecoration: "none",
                                            }}
                                            className="comment-button"
                                        >
                                            Komentar
                                        </button>{" "}
                                        {auth.user &&
                                            post.userid === auth.user.id && (
                                                <InertiaLink
                                                    href={route(
                                                        "posts.delete",
                                                        { id: post.id }
                                                    )}
                                                    method="delete"
                                                    as="button"
                                                    className="btn"
                                                    style={{
                                                        backgroundColor:
                                                            "green",
                                                        color: "white",
                                                        padding: "5px 10px",
                                                        marginRight: "10px",
                                                        borderRadius: "5px",
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    Hapus
                                                </InertiaLink>
                                            )}
                                        <div>
                                            <button
                                                onClick={() =>
                                                    toggleComments(post.id)
                                                }
                                                style={{
                                                    backgroundColor: "green",
                                                    marginTop: "4px",
                                                    color: "white",
                                                    padding: "5px 10px",
                                                    marginRight: "10px",
                                                    borderRadius: "5px",
                                                    textDecoration: "none",
                                                }}
                                            >
                                                {post.showComments
                                                    ? "Sembunyikan Komentar"
                                                    : "Tampilkan Komentar"}
                                            </button>
                                        </div>
                                        {auth.user && <div></div>}
                                    </div>

                                    {/* menampilkan komentar */}
                                    {post.showComments && (
                                        <div>
                                            {post.komentars &&
                                            post.komentars.length > 0 ? (
                                                <ul>
                                                    {post.komentars.map(
                                                        (komentar) => (
                                                            <li
                                                                key={
                                                                    komentar.id
                                                                }
                                                            >
                                                                {
                                                                    komentar.comment
                                                                }
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            ) : (
                                                <p>Tidak ada komentar.</p>
                                            )}
                                        </div>
                                    )}
                                    {komenForm && post.id === postingId && (
                                        <div
                                            style={{
                                                position: "fixed",
                                                top: "0",
                                                left: "0",
                                                width: "100%",
                                                height: "100%",
                                                backgroundColor:
                                                    "rgba(0, 0, 0, 0.3)",
                                                zIndex: "998",
                                                backdropFilter: blurBackground
                                                    ? "blur(5px)"
                                                    : "none",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    position: "fixed",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform:
                                                        "translate(-50%, -50%)",
                                                    backgroundColor: "white",
                                                    padding: "20px",
                                                    borderRadius: "8px",
                                                    zIndex: "999",
                                                }}
                                            >
                                                <Comment
                                                    closeForm={tutupForm}
                                                    postId={post.id}
                                                />
                                            </div>
                                            <button
                                                onClick={tutupForm}
                                                style={{
                                                    backgroundColor: "red",
                                                    color: "white",
                                                    padding: "5px 10px",
                                                    borderRadius: "5px",
                                                    textDecoration: "none",
                                                }}
                                            >
                                                tutup
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                    ) : (
                        <p>Tidak ada postingan.</p>
                    )}
                <div className="pagination">
                    {Array.from({ length: pageNumbers }, (_, index) => (
                        <button key={index + 1} onClick={() => paginate(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
                </div>
            </div>
        </div>
    );
}
