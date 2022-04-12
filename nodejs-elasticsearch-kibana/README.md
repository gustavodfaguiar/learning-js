
### Get IP container
 - docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' name_container
