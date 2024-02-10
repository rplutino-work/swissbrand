import React, { useState, useEffect } from 'react';
import styles from './index.css';
import { EXPERIMENTAL_Select as Select } from 'vtex.styleguide';
import { useRuntime } from 'vtex.render-runtime';

interface FilterSearchProps {
  mujer: {
    modelo: Array<{ value: string; label: string }>;
    marca: Array<{ value: string; label: string }>;
    cilindrada: Array<{ value: string; label: string }>;
    año: Array<{ value: string; label: string }>;
  };
}

interface Option {
  value: string;
  label: string;
}

const FilterSearch: React.FC<FilterSearchProps> = ({ mujer }) => {
  const [marcaOptions, setMarcaOptions] = useState<Option[]>([]);
  const [marca, setMarca] = useState<string | undefined>();
  const [modeloOptions, setModeloOptions] = useState<Option[]>([]);
  const [modelo, setModelo] = useState<string | undefined>();
  const [cilindradaOptions, setCilindradaOptions] = useState<Option[]>([]);
  const [cilindrada, setCilindrada] = useState<string | undefined>();
  const [añoOptions, setAñoOptions] = useState<Option[]>([]);
  const [año, setAño] = useState<string | undefined>();

  const marcaText = 'Marca';
  const modeloText = 'Modelo';
  const cilindradaText = 'Clindrada';
  const añoText = 'Año';

  const { navigate } = useRuntime();

  useEffect(() => {
    setCilindrada(undefined);
    setModelo(undefined);
    setMarca(undefined);
    setAño(undefined);

    // Fetch "Marca" options
    fetch('/api/catalog_system/pub/specification/fieldvalue/122')
      .then(response => response.json())
      .then(data => {
        const options: Option[] = data.map((item: any) => ({
          value: item.Value,
          label: item.Value
        }));
        setMarcaOptions(options);
      })
      .catch(error => {
        console.error('Error fetching specification values for Marca:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch "Modelo" options
    if (marca) {
      // Obtener las opciones de "Modelo" en función de la "Marca" Elegida
      fetch(`/api/catalog_system/pub/products/search?fq=specificationFilter_122:${marca}`)
        .then(response => response.json())
        .then(data => {
          const modelos = data.map((item: { Modelo: any }) => item.Modelo || []);
          const modelosSinRepetir = [...new Set(modelos.flat())];

          // Convertir a Option[]
          const opcionesModelo: Option[] = modelosSinRepetir.map(modelo => {
            if (typeof modelo === 'string') {
              return {
                value: modelo,
                label: modelo
              };
            }
            // Si el Modelo no es de tipo string, puedes ajustar esta lógica según tus necesidades
            return {
              value: String(modelo),
              label: String(modelo)
            };
          });

          console.log('modelosSinRepetir:' + JSON.stringify(opcionesModelo));

          if (opcionesModelo) {
            // Asignar los valores a setModeloOptions
            setModeloOptions(opcionesModelo);
          } else {
            console.error('Campo "Modelo" no encontrado en las especificaciones.');
          }
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });
    }
  }, [marca]);

  useEffect(() => {
    // Fetch "Cilindrada" options
    if (modelo) {
      // Obtener las opciones de "Cilindrada" en función del "Modelo" elegido
      fetch(
        `/api/catalog_system/pub/products/search?fq=specificationFilter_122:${marca},specificationFilter_127:${modelo}`
      )
        .then(response => response.json())
        .then(data => {
          const cilindradas = data.map((item: { Cilindrada: any }) => item.Cilindrada || []);
          const cilindradasSinRepetir = [...new Set(cilindradas.flat())];

          console.log('cilindradasSinRepetir:' + JSON.stringify(cilindradasSinRepetir));

          // Convertir a Option[]
          const opcionesCilindrada: Option[] = cilindradasSinRepetir.map(cilindrada => {
            if (typeof cilindrada === 'string') {
              return {
                value: cilindrada,
                label: cilindrada
              };
            }

            // Si la Cilindrada no es de tipo string, puedes ajustar esta lógica según tus necesidades
            return {
              value: String(cilindrada),
              label: String(cilindrada)
            };
          });

          if (opcionesCilindrada) {
            // Asignar los valores a setCilindradaOptions
            setCilindradaOptions(opcionesCilindrada);
          } else {
            console.error('Campo "Cilindrada" no encontrado en las especificaciones.');
          }
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });
    }
  }, [modelo]);

  useEffect(() => {
    // Fetch "Año" options
    if (cilindrada) {
      // Obtener las opciones de "Año" en función de la "Cilindrada" Eligeda
      fetch(
        `/api/catalog_system/pub/products/search?fq=specificationFilter_122:${marca},specificationFilter_127:${modelo},specificationFilter_139:${cilindrada}`
      )
        .then(response => response.json())
        .then(data => {
          const años = data.map((item: { Año: any }) => item.Año || []);
          const añosSinRepetir = [...new Set(años.flat())];

          console.log('añosSinRepetir:' + JSON.stringify(añosSinRepetir));

             // Convertir a Option[]
             const opcionesAño: Option[] = añosSinRepetir.map(año => {
              if (typeof año === 'string') {
                return {
                  value: año,
                  label: año,
                };
              }
              // Si el Año no es de tipo string, puedes ajustar esta lógica según tus necesidades
              return {
                value: String(año),
                label: String(año),
              };
            });

            if (opcionesAño) {
              // Asignar los valores a setAñoOptions
              setAñoOptions(opcionesAño);
            } else {
              console.error('Campo "Año" no encontrado en las especificaciones.');
            }
          })
          .catch(error => {
            console.error('Error al obtener los datos:', error);
          });
      }
    }, [cilindrada]);

  const handleSearch = () => {
    const to = `/repuestos/${marca}/${modelo}/${cilindrada}/${año}?map=category-1,referencia,modelo,cilindrada,año`;
    navigate({
      to
    });
  };

  const deleteNotMarcas = () => {
    setModelo(null);
    setCilindrada(null);
    setAño(null);
    let fieldSpecification = document.getElementsByClassName('css-dvua67-singleValue');
    if (fieldSpecification.length == 2) {
      fieldSpecification[1].textContent = modeloText;
    } else if (fieldSpecification.length == 3) {
      fieldSpecification[1].textContent = modeloText;
      fieldSpecification[2].textContent = cilindradaText;
    } else if (fieldSpecification.length == 4) {
      fieldSpecification[1].textContent = modeloText;
      fieldSpecification[2].textContent = cilindradaText;
      fieldSpecification[3].textContent = añoText;
    }
  };

  const deleteNotModelo = () => {
    setCilindrada(null);
    setAño(null);
    let fieldSpecification = document.getElementsByClassName('css-dvua67-singleValue');
    if (fieldSpecification.length == 3) {
      fieldSpecification[2].textContent = cilindradaText;
    } else if (fieldSpecification.length == 4) {
      fieldSpecification[2].textContent = cilindradaText;
      fieldSpecification[3].textContent = añoText;
    }
  };

  const deleteNotCilindrada = () => {
    setAño(null);
    let fieldSpecification = document.getElementsByClassName('css-dvua67-singleValue');
    if (fieldSpecification.length == 4) {
      fieldSpecification[3].textContent = añoText;
    }
  };

  const handleMarcaChange = (value: string) => {
    console.log('handleMarcaChange:', value);
    setModelo(null);
    setCilindrada(null);
    setAño(null);
    setMarca(value);
  };

  const handleModeloChange = (value: string) => {
    console.log('handleModeloChange:', value);
    setModelo(value);
    setCilindrada(null);
    setAño(null);
  };

  const handleCilindradaChange = (value: string) => {
    setCilindrada(value);
    setAño(null);
  };

  const handleAñoChange = (value: string) => {
    setAño(value);
  };

  return (
    <div className={styles['search-container']}>
      <div className={styles['search-body']}>
        <div className={styles['search-header-content']}>
          <div className={styles['search-header']}>¿Qué estás buscando?</div>
        </div>
        <div className={styles['search-steps']}>
          <div className={`${styles['search-step']} ${styles['search-step-active']}`}>
            <label>
              <span>1</span>
              Marca
            </label>
            <div className={styles['selects']} onClick={deleteNotMarcas}>
              <Select
                label=""
                options={marcaOptions}
                multi={false}
                onChange={(values: { value: string }) => handleMarcaChange(values.value)}
                placeholder={marcaText}
                searchable={true}
                clearable={false}
              />
            </div>
          </div>

          <div
            className={
              marca ? `${styles['search-step']} ${styles['search-step-active']}` : styles['search-step']
            }
          >
            <label>
              <span>2</span>
              Modelo
            </label>
            <div className={styles['selects']} onClick={deleteNotModelo}>
              <Select
                label=""
                options={modeloOptions}
                multi={false}
                onChange={(values: { value: string }) => handleModeloChange(values.value)}
                placeholder={modeloText}
                searchable={true}
                clearable={false}
              />
            </div>
          </div>

          <div
            className={
              marca && modelo
                ? `${styles['search-step']} ${styles['search-step-active']}`
                : styles['search-step']
            }
          >
            <label>
              <span>3</span>
              Cilindrada
            </label>
            <div className={styles['selects']} onClick={deleteNotCilindrada}>
              <Select
                label=""
                options={cilindradaOptions}
                multi={false}
                onChange={(values: { value: string }) => handleCilindradaChange(values.value)}
                placeholder={cilindradaText}
                searchable={true}
                clearable={false}
              />
            </div>
          </div>

          <div
            className={
              marca && modelo && cilindrada
                ? `${styles['search-step']} ${styles['search-step-active']}`
                : styles['search-step']
            }
          >
            <label>
              <span>4</span>
              Año
            </label>
            <div className={styles['selects']}>
              <Select
                label=""
                options={añoOptions}
                multi={false}
                onChange={(values: { value: string }) => handleAñoChange(values.value)}
                placeholder={añoText}
                searchable={true}
                clearable={false}
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            className={
              modelo && marcaOptions && cilindrada && año
                ? `${styles['search-btn']} ${styles['search-btn-active']}`
                : styles['search-btn']
            }
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export const filterSearchSchema = {
  title: 'Buscador',
  type: 'object',
  properties: {}
};

export default FilterSearch;
