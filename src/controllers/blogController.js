    // Import the Blog model
const Blog = require('../models/Blog');


//Save blog data
exports.store = async (req, res) => {

  try {
    const { title, content } = req.body;
    const author = req.user._id; 

    if (!title.trim()) {
      return res.json({ error: 'Blog title is required' });
    }

    if (!content) {
      return res.json({ error: 'Blog content is required' });
    }

    const blog = await Blog.create({ title, content, author});

    return res.json({ success: true, blog });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while saving the blog' });
  }
};




//Read blog
exports.view = async(req, res)=> {
    try {
        const blogs = await Blog.find({}).populate('author');
        res.status(200).json({ status: 'success', datas: blogs });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: 'Blog data not found' });
    }
}




//Update blog
exports.update = async(req, res)=> {
    try {
        const blog = await Blog.findById(req.params.id);

        blog.title      = req.body.title    || blog.title;
        blog.content    = req.body.content  || blog.content;        
        
        const updateBlog = await blog.save();
    
        res.status(200).json({status: 'success', data: updateBlog})
        
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: 'Blog data not update' }); 
    }
}



//Delete blog
exports.destroy = async (req, res)=> {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);    
        res.status(200).json({status: 'success', data: blog})

    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: 'Blog data not delete' }); 
    }
}



