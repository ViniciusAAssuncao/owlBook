import Head from 'next/head';
import styles from '../styles/Dark.module.css';
import owlLogoDark from '../public/owlLogoDark.png';
import { Helmet } from "react-helmet";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dark() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const apiKey = "";

  toast.configure();

  function inputSubmit() {
    if (book === "") {
      toast.error("Por favor digite um livro!", { position: toast.POSITION.TOP_CENTER });
    } else {
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${apiKey}&maxResults=40`)
        .then(res => {
          setResult(res.data.items);
        });
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>OwlBooks</title>
        <meta name="description" content="OwlBooks is a website application for search books, fast, clear and secure." />
        <link rel="icon" href="/owlFavicon.ico" />
      </Head>
      <Helmet>
        <body style="background-color: #191919" />
      </Helmet>
      <header>
      <Link href="/"><Image
          src={owlLogoDark}
          alt="Picture of the author"
          width="100px"
          height="80px"
          className={styles.logoHeader}
        /></Link>
      </header>
      <main>
      <div className={styles.bookContainer}>{result.map((book) => (
          <a target="_blank" href={book.volumeInfo.previewLink} rel="noreferrer">
            <img src={
              book.volumeInfo.imageLinks === undefined
                ? ""
                : `${book.volumeInfo.imageLinks.thumbnail}`
            } alt={book.title} />
          </a>
        ))}</div>
        <div className={styles.searchBox}>
          <label>Search for a book</label>
          <div>
          <input type="search" placeholder="George Martin..." required onChange={e => setBook(e.target.value)} />
            <button onClick={inputSubmit}>Go</button>
          </div>
        </div>
      </main>
      <footer>
        <div className={styles.background_wrap}>
          <div className={styles.x1}>
            <div className={styles.cloud}></div>
          </div>

          <div className={styles.x2}>
            <div className={styles.cloud}></div>
          </div>

          <div className={styles.x3}>
            <div className={styles.cloud}></div>
          </div>

          <div className={styles.x4}>
            <div className={styles.cloud}></div>
          </div>

          <div className={styles.x5}>
            <div className={styles.cloud}></div>
          </div>
        </div>
      </footer>
      <div className={styles.footerTradeMark}>
        <p className={styles.tradeMark}>Show Me How to Live Studios &#174;</p>
      </div>
    </div>
  )
}
