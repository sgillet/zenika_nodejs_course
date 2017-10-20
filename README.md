# Contacts tutorial  #
NodeJS formation in Zenika (2017.10.18-20)

## Test-it ##

### List all contacts ###
`node index.js list`

### Add a contact ###
`node index.js add --firstName seb --lastName gillet`

### Delete a contact ###
`node index.js delete --id {id}`


# Infos pratiques #
[Url du tuto berthelot.io](http://berthelot.io/)
## pour la retrocompatibilité ##
const / let => var pour etre compatible ie9 : babel

## audit de sécu d'un package ##
[node security package (nsp dans github)](https://nodesecurity.io/)


## aide a l'install de node ##
nvm
ex: `nvm install --lts`
## debug ##
* mocha
** chai (extended assertions : should.be.... expect().to.equals())
** sinon (mock / spy on functions)
## liens utiles ##
[comparatif http clients](https://npmcompare.com/compare/express,hapi,request,restify)
