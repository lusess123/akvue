import appget from './appget'

export default async(obj) => {
    const props = appget().map(app => {
        return app.useContext;
    });

    return props[0](obj).then(a => {
        return props[1](a).then(b => {
            return props[2](b)
        })
    })

}