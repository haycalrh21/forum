import React from "react";
import { useForm } from '@inertiajs/inertia-react';

const Posting = ({ closeForm }) => {
    const { data, setData, post, processing, errors } = useForm({
        judul: "",
        isi: "",


    })


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await post(route('postingan'));

        if (response.status === 200) {
            console.log('Posting successful');
            // Reset form data or close the form as needed
            setData({
                judul: "",
                isi: "",

            });
            closeForm();
        } else {
            console.log('Posting failed');
            // Tambahan: Tampilkan pesan kesalahan atau tindakan lain jika diperlukan
        }
    }



    return (
        <div>
            <div>
                <h1>Mulai Posting</h1>
            </div>
            <div>
    <form onSubmit={handleSubmit}>
    <input type="hidden" name="_token" value={data._token} />
        <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Judul Posting:</label>
            <input
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
