import styles from "@/pages/components/Sidebar/styles.module.css"


import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          <li>
            <Link href="/cadastros">
              Cadastros
            </Link>
          </li>
          <li>
            <Link href="/registros">
              Registros
            </Link>
          </li>
          <li>
            <Link href="/moradores">
              Moradores
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/contatos">
              Contatos
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

