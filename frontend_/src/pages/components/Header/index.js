import Sidebar from "../Sidebar";
import styles from "@/pages/components/Header/styles.module.css"

export default function Header({ children }) {
  return (
    <div className="container">
      <Sidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
};
