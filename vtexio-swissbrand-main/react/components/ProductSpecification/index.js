import {useState,useEffect} from 'react';
import { useProduct } from "vtex.product-context";
import styles from "./style.css";

function index() {

    const [tabla, setTabla] = useState([])
    const productContext = useProduct();
    const {product} = productContext

    useEffect(()=>{
        if(product && product?.properties){
            const fichaTecnica = product?.properties?.filter(spec => spec.name === 'tabla-talles')[0]?.values
            if(!fichaTecnica) return
            setTabla(JSON.parse(fichaTecnica))
        }
    },[product])

  return (
    <div className={`${styles["fichaProperties"]}`}>
        <div className={`${styles["fichaContainer"]}`}>
        {
            tabla?.ficha?.map(item => (
                <div className={`${styles["fichaContent"]}`}>
                    <p className={`${styles["fichaLabel"]}`}>{item.label}</p>
                    <div className={`${styles["fichaValues"]}`}>
                        {item?.values?.map(valor => (
                            <span className={`${styles["fichaValue"]}`}>
                                {valor}
                            </span>
                        ))}
                    </div>
                </div>
            ))
        }
        </div>

        <div className={`${styles["fichaContainer"]}`}>
                {
                    tabla?.otros?.map(item => (
                        <div className={`${styles["fichaContent"]}`}>
                            <p className={`${styles["fichaLabel"]}`}>{item.label}</p>
                            <div className={`${styles["fichaValues"]}`}>
                                {item?.values?.map(valor => (
                                    <span className={`${styles["fichaValue"]}`}>
                                        {valor}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
    </div>
    
  )
}

export default index