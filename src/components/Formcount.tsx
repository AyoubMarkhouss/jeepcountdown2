import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Formulaire = () => {
  const router = useRouter();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [ville, setVille] = useState("");
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = {
      nom,
      prenom,
      telephone,
      email,
      ville,
    };

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const content = await response.json();
        console.log(content);

        // Reset form fields
        setNom("");
        setPrenom("");
        setTelephone("");
        setEmail("");
        setVille("");

        // Show success toast and refresh the page
        toast.success("Envoyé avec succès !");
        setTimeout(() => {
          router.refresh();
        }, 3000);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <>
      <div className=" bg-black">
        <section className="p-6 text-slate-50">
          <form className="form w-full  p-8 " onSubmit={handleSubmit}>
            <div className="lg:px-80">
              <div className="">
                <label className="block text-lg mb-1 ml-1">Nom :</label>
                <input
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  name="Nom"
                  id="Nom"
                  type="text"
                  placeholder=""
                  className="block w-full  p-1 py-2 mb-3 text-slate-50 rounded focus:outline-none  focus:ring-1 backdrop-blur-sm  bg-gray-400/10 border border-slate-100/20"
                />
              </div>
              <div>
                <label className="block text-lg mb-1 ml-1">Prénom :</label>
                <input
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  name="Prenom"
                  id="Prenom"
                  type="text"
                  placeholder=""
                  className="block w-full  p-1 py-2 mb-3 text-slate-50 rounded focus:outline-none  focus:ring-1 backdrop-blur-sm  bg-gray-400/10 border border-slate-100/20"
                />
              </div>
              <div>
                <label className="block text-lg mb-1 ml-1">Téléphone :</label>
                <input
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  name="Telephone"
                  id="Telephone"
                  type="tel"
                  placeholder=""
                  className="block w-full  p-1 py-2 mb-3 text-slate-50 rounded focus:outline-none  focus:ring-1 backdrop-blur-sm  bg-gray-400/10 border border-slate-100/20"
                />
              </div>
              <div>
                <label className="block text-lg mb-1 ml-1">E-mail :</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="Email"
                  id="Email"
                  type="email"
                  placeholder=""
                  className="block w-full  p-1 py-2 mb-3 text-slate-50 rounded focus:outline-none  focus:ring-1 backdrop-blur-sm  bg-gray-400/10 border border-slate-100/20"
                />
              </div>
              <div>
                <label className="block text-lg mb-1 ml-1">Ville :</label>
                <input
                  value={ville}
                  onChange={(e) => setVille(e.target.value)}
                  name="Ville"
                  id="Ville"
                  type="text"
                  placeholder=""
                  className="block w-full  p-1 py-2 mb-3 text-slate-50 rounded focus:outline-none  focus:ring-1 backdrop-blur-sm  bg-gray-400/10 border border-slate-100/20"
                />
              </div>

              <div>
                <button
                  name="button"
                  type="submit"
                  className="w-full px-4 py-4 mt-10 hover:text-black font-bold rounded shadow focus:outline-none  backdrop-blur-sm  bg-yellow-500/80 border border-slate-100/20 hover:bg-amber-500/60 text-gray-50 "
                >
                  Envoyer
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>

      <ToastContainer
        position="bottom-right"
        hideProgressBar={true}
        theme="light"
        autoClose={2000}
      />
    </>
  );
};

export default Formulaire;
