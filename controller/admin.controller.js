exports.main = (req, res) => {
    res.render('main', { navlist: [{ title: 'Categories', link: 'catgeory' }, { title: 'Organism', link: 'organism' }] })
}