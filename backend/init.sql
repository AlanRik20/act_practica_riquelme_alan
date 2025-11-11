
CREATE TABLE equipos (
    id_equipos SERIAL PRIMARY KEY,
    nombre character varying(100) NOT NULL,
    marca character varying(100) NOT NULL,
    modelo character varying(100),
    numero_serie character varying(100) NOT NULL,
    responsable_id integer NOT NULL,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre character varying(50) NOT NULL
);


CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    -- 'UNIQUE' es importante para que no se repitan emails
    email VARCHAR(150) UNIQUE NOT NULL, 
    password VARCHAR(255) NOT NULL,
    rol_id INTEGER NOT NULL,  -- <-- ¡LA COMA ES CLAVE!

    -- La línea que faltaba, ahora corregida:
    CONSTRAINT fk_rol
        FOREIGN KEY (rol_id) 
        REFERENCES roles(id)
);
INSERT INTO roles (nombre) VALUES ('usuario'), ('admin');

INSERT INTO usuarios (nombre, email, password, rol_id) VALUES ('alan','alan@gmail.com',  '123456',2);