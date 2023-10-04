import Header from "../components/Header";
import styles from "@/pages/cadastros/styles.module.css"

export default function Cadastros() {
    return (
        <Header>
            < div className={styles.container}>
                <h1 className={styles.title}>Cadastros</h1>

                <form className={styles.form}>

                    <div>
                    <label>Tipo:</label>
                        <select className={styles.type}>
                            <option>Morador</option>
                            <option>Visitante</option>
                            <option>Serviço</option>
                        </select>


                        <label>RG:</label>
                        <input type="text" className={styles.rg} />

                        <label>Nome Completo:</label>
                        <input type="text" className={styles.name} />

                        <label>Empresa:</label>
                        <input type="text" className={styles.company} />
                    </div><br/>

                    <div>
                        <label>Apt:</label>
                        <input type="number" className={styles.apt} />

                        <label className={styles.labelBloco}>Bloco:</label>
                        <input type="text" className={styles.bloco} />

                        <label className={styles.labelDate}>Data entrada:</label>
                        <input type="date" className={styles.date} />
                    </div><br/>

                    <div>
                        <label className={styles.labelVehicle}>Veículo:</label>
                        <input type="number" className={styles.vehicle} />

                        <label className={styles.labelPlate}>Placa:</label>
                        <input type="text" className={styles.plate} />
                    </div>

                    <button type="submit" className={styles.button}>Cadastrar</button>

                </form>
            </div>
        </Header>
    );
};
