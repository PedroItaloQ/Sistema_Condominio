import Header from "../components/Header";
import styles from "@/pages/cadastros/styles.module.css"
import { useState } from "react";
import axios from "axios"

export default function Cadastros() {

    const [data, setData] = useState({
        type:"",
        rg:"",
        name:"",
        empresa:"",
        apt:"",
        bloco:"",
        dataEntrada:"",
        veiculo:"",
        placa:""
    });

    //Receber os dados do campo formulário
    const valueInput = e => setData({...data, [e.target.name]: e.target.value});

    const sendMsg = async (e) => {
        e.preventDefault();


        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        };

        await axios.post('http://localhost:8080/cadastros', data, headers);
    };

    return (
        <Header>
            < div className={styles.container}>
                <h1 className={styles.title}>Cadastros</h1>

                <form className={styles.form} onSubmit={sendMsg}>

                    <div>
                    <label>Tipo:</label>
                        <select value={data.type} name='type' onChange={valueInput} className={styles.type}>
                            <option value="Morador" >Morador</option>
                            <option value="Visitante" >Visitante</option>
                            <option value="Serviço" >Serviço</option>
                        </select>


                        <label>RG:</label>
                        <input onChange={valueInput} name="rg" type="text" value={data.rg} className={styles.rg} />

                        <label>Nome Completo:</label>
                        <input onChange={valueInput} name="name" type="text" value={data.name} className={styles.name} />

                        <label>Empresa:</label>
                        <input onChange={valueInput} name="empresa" type="text" value={data.empresa} className={styles.company} />
                    </div><br/>

                    <div>
                        <label>Apt:</label>
                        <input onChange={valueInput} name="apt" type="number" value={data.apt} className={styles.apt} />

                        <label className={styles.labelBloco}>Bloco:</label>
                        <input onChange={valueInput} name="bloco" type="text" value={data.bloco} className={styles.bloco} />

                        <label className={styles.labelDate}>Data entrada:</label>
                        <input onChange={valueInput} name="dataEntrada" type="datetime-local" value={data.dataEntrada} className={styles.date} />
                    </div><br/>

                    <div>
                        <label className={styles.labelVehicle}>Veículo:</label>
                        <input onChange={valueInput} name="veiculo" type="text" value={data.veiculo} className={styles.vehicle} />

                        <label className={styles.labelPlate}>Placa:</label>
                        <input onChange={valueInput} name="placa" type="text" value={data.placa} className={styles.plate} />
                    </div>

                    <button type="submit" className={styles.button}>Cadastrar</button>

                </form>
            </div>
        </Header>
    );
};
