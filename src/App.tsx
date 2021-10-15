/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import FormPost from './components/FormPost';
import Post from './components/Post';
import api from './services/api';
import { IPost } from './types/IPost';


function App() {
  const [posts, setPosts] = useState([] as IPost[]);
  const [updateValues, setUpdateValues] = useState({} as IPost);

  async function onSubmitPost(data: IPost) {
    try {
      const response = await api.post('/posts', data);
      setPosts([...posts, response.data as IPost]);
    } catch (error: AxiosError | any) {
      console.log(error?.response?.data);
      const { message } = error?.response?.data;
      alert(`Erro ao cadastrar post: ${message}`);
    }
  }

  async function deletePost(id: string) {
    try {
      await api.delete(`/posts/${id}`);

      const filteredPosts: IPost[] = posts.filter(post => post.id !== id);

      setPosts(filteredPosts);
    } catch (error: AxiosError | any) {
      console.log(error?.response?.data);
      const { message } = error?.response?.data;
      alert(`Erro ao deletar post: ${message}`);
    }
  }

  async function getPosts() {
    try {
      const { data } = await api.get('/posts', {
        method: 'GET',
      });

      setPosts(data as IPost[]);

    } catch (error: AxiosError | any) {
      console.log(error?.response?.data);
      const { message } = error?.response?.data;
      alert(`Erro ao buscar posts: ${message}`);
    }
  }

  async function onUpdatePost(dataPost: IPost) {
    try {
      const { data } = await api.put(`/posts/${dataPost.id}`, dataPost);

      console.log(data);


      /* const filteredPosts: IPost[] = posts.filter(post => post.id !== updateValues.id);

      setPosts([...filteredPosts, data as IPost]); */
    } catch (error: AxiosError | any) {
      console.log(error?.response?.data);
      const { message } = error?.response?.data;
      alert(`Erro ao atualizar post: ${message}`);
    }
  }


  const onClickPost = (id: string) => {
    const filteredPost: IPost | undefined = posts.find(post => post.id === id);

    if (!filteredPost) return null

    setUpdateValues(filteredPost);
  }

  useEffect(() => {
    getPosts()
  }, [])



  return (
    <div className="App">
      <h1>Conteúdos</h1>
      <FormPost onSubmit={onSubmitPost} onUpdate={onUpdatePost} updateValues={updateValues} />
      <div>
        <h3>Conteúdos Cadastrados</h3>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Conteúdos relacionados</th>
              <th>Data Criação</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post: IPost) => (
              <Post key={post.id} data={post} onDelete={deletePost} onClickUpdate={onClickPost} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
