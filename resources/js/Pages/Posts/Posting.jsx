import React from "react";
import { useForm } from '@inertiajs/inertia-react';

const Posting = ({ closeForm }) => {
    const { data, setData, post, processing, errors } = useForm({
        judul: "",
        isi: "",


    })


    const handleSubmit = (e) => {
        e.preventDefault();

        post("/postingan", data, {
          onSuccess: () => {
            closeForm();
          },
        });
      };



    return (
        <div className="bg-cyan-900 text-white">
            <div>
                <h1>Mulai Posting</h1>
            </div>
            <div>
    <form onSubmit={handleSubmit}>
    <input type="hidden" name="_token" value={data._token} />
        <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Judul Posting:</label>
            <input
                className="text-black"

                type="text"
                name="judul"
                value={data.judul}
                onChange={(e) => setData("judul", e.target.value)}
                style={{ width: "100%", padding: "8px" }}
            />
        </div>
        <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Isi Postingan:</label>
            <textarea
              className="text-black"

                name="isi"
                value={data.isi}
                onChange={(e) => setData("isi", e.target.value)}
                style={{ width: "100%", padding: "8px" }}
            ></textarea>
        </div>

        <button type="submit" disabled={processing} style={{ backgroundColor: "green", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer" }}>
            Buat Postingan
        </button>
    </form>
</div>

        </div>
    )
}

export default Posting;
