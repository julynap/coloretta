# Solución: Página no carga en móvil desde S3

## Problemas Comunes y Soluciones

### 1. **Configuración de CORS en S3**

Los móviles pueden tener restricciones más estrictas de CORS. Configura CORS en tu bucket de S3:

**En la consola de S3:**
1. Ve a tu bucket → **Permissions** → **Cross-origin resource sharing (CORS)**
2. Agrega esta configuración:

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "HEAD"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [
            "ETag"
        ],
        "MaxAgeSeconds": 3000
    }
]
```

### 2. **Content-Type de Archivos**

Asegúrate de que los archivos tengan el Content-Type correcto:

- `index.html` → `text/html`
- `styles.css` → `text/css`
- `script.js` → `application/javascript`
- Imágenes PNG → `image/png`
- Imágenes JPG/JPEG → `image/jpeg`
- Imágenes SVG → `image/svg+xml`

**Para verificar/actualizar:**
1. Selecciona el archivo en S3
2. Ve a **Properties** → **Metadata**
3. Verifica que `Content-Type` esté configurado correctamente

### 3. **Política de Acceso Público**

Asegúrate de que el bucket permita acceso público:

**Bucket Policy:**
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::TU-BUCKET-NAME/*"
        }
    ]
}
```

**Block Public Access:**
1. Ve a **Permissions** → **Block public access**
2. Desmarca todas las opciones (o al menos "Block public access to buckets and objects granted through new access control lists")

### 4. **HTTPS (Recomendado)**

Los móviles modernos pueden bloquear contenido HTTP. Usa CloudFront o un dominio con SSL:

**Opción A: CloudFront**
- Crea una distribución CloudFront apuntando a tu bucket S3
- CloudFront proporciona HTTPS automáticamente

**Opción B: Dominio personalizado con SSL**
- Usa Route 53 y Certificate Manager para SSL

### 5. **Rutas de Archivos**

Verifica que todas las rutas sean relativas (como están ahora):
- ✅ `href="styles.css"` (correcto)
- ✅ `src="assets/images/logo.png"` (correcto)
- ❌ `href="/styles.css"` (puede fallar)
- ❌ `src="https://..."` (solo si es externo)

### 6. **Configuración de Website Hosting**

Habilita el website hosting en S3:

1. Ve a **Properties** → **Static website hosting**
2. Selecciona **Enable**
3. **Index document**: `index.html`
4. **Error document**: `index.html` (para SPA)
5. Copia la **Bucket website endpoint** (no uses el endpoint de objeto)

**IMPORTANTE:** Usa el endpoint de website, no el endpoint de objeto:
- ❌ `https://tu-bucket.s3.amazonaws.com/index.html`
- ✅ `http://tu-bucket.s3-website-us-east-1.amazonaws.com`

### 7. **Verificar en Móvil**

**Pasos para diagnosticar:**
1. Abre la consola de desarrollador en el móvil (Chrome DevTools remoto)
2. Revisa la pestaña **Network** para ver qué archivos fallan
3. Revisa la pestaña **Console** para ver errores JavaScript
4. Verifica que todos los recursos se carguen con código 200

### 8. **Cache y Headers**

Agrega headers de cache apropiados:

**En CloudFront o S3:**
- `Cache-Control: public, max-age=3600` para HTML/CSS/JS
- `Cache-Control: public, max-age=31536000` para imágenes

### 9. **Verificar Permisos de Archivos**

Asegúrate de que todos los archivos tengan permisos de lectura pública:
1. Selecciona cada archivo
2. **Actions** → **Make public** (si es necesario)

### 10. **Problemas Específicos de Móvil**

**Si solo falla en móvil:**
- Verifica que no haya JavaScript que requiera características no disponibles en móvil
- Revisa si hay errores de CORS en la consola del móvil
- Verifica que las fuentes de Google se carguen correctamente
- Asegúrate de que no haya recursos bloqueados por políticas de seguridad del navegador móvil

## Checklist Rápido

- [ ] CORS configurado en S3
- [ ] Content-Type correcto en todos los archivos
- [ ] Bucket Policy permite acceso público
- [ ] Block Public Access deshabilitado
- [ ] Website hosting habilitado
- [ ] Usando endpoint de website (no objeto)
- [ ] Todos los archivos son públicos
- [ ] HTTPS configurado (CloudFront o dominio)
- [ ] Rutas relativas en HTML
- [ ] Sin errores en consola del móvil

## Comandos Útiles (AWS CLI)

```bash
# Verificar Content-Type
aws s3 cp s3://tu-bucket/index.html - --metadata-directive REPLACE --content-type "text/html"

# Hacer archivo público
aws s3api put-object-acl --bucket tu-bucket --key index.html --acl public-read

# Subir con Content-Type correcto
aws s3 cp index.html s3://tu-bucket/ --content-type "text/html"
aws s3 cp styles.css s3://tu-bucket/ --content-type "text/css"
aws s3 cp script.js s3://tu-bucket/ --content-type "application/javascript"
```

## Contacto para Soporte

Si después de seguir estos pasos el problema persiste:
1. Revisa la consola del navegador móvil para errores específicos
2. Verifica los logs de CloudFront (si lo usas)
3. Prueba en diferentes navegadores móviles (Chrome, Safari, Firefox)


