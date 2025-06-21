import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  image: {
    type: String 
  },
  password: { 
    type: String, 
    required: true 
  },
  authorName: { 
    type: String, 
    required: true 
  },
  authorProfilePicture: { 
    type: String 
  },
  likes: { 
    type: Number, 
    default: 0 
  },
  blogDescription: { 
    type: String 
  },
   category: {
  type: String,
  required: true,
  enum: ['Tech', 'Health & Fitness', 'Finance', 'Travel','Lifestyle', 'Education', 'Personal','Fashion & Beauty', 'Food']
}
}, {
  timestamps: true
});

export default mongoose.model('Blog', BlogSchema);
