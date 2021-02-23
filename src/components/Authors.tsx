import React, { useEffect, useState } from 'react';
import { Button, Card, Icon, Confirm } from 'semantic-ui-react'

import { AuthorForm as Form } from './Form';
import { Author } from '../types/author';
import AuthorRequest from '../repository/author';

const defaultAuthor: Author = {
  id: 0,
  first_name: '',
  last_name: '',
  books_attributes: []
}

export const Authors = () => {
  const [authors, setAuthors] = useState([] as Author[]);
  const [editingAuthor, setEditingAuthor] = useState(defaultAuthor);
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const authorsFunc = async () => {
      const res = await AuthorRequest.getAuthors();
      setAuthors(res.data);
    };
    authorsFunc();
  }, []);

  return (
    <div style={{ padding: '24px', width: '1400px' }}>
      <Card.Group>
        {authors.map((author, i) => {
          return (
            <Card key={author.id || i}>
            <Card.Content style={{ display: 'flex' }}>
              <div>
                <Card.Header>{author.first_name} {author.last_name}</Card.Header>
                <Card.Meta>書籍一覧</Card.Meta>
                <Card.Description>
                  <ul style={{ paddingLeft: '20px', margin: '4px 0' }}>
                    {author.books_attributes.map((book, i) => (
                      <li key={`books_attributes_${book.id || i}`}>{book.name}</li>
                    ))}
                  </ul>
                </Card.Description>
              </div>
              <Icon
                name='user'
                size='big'
              />
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='blue' onClick={() => setEditingAuthor(author)}>
                  編集
                </Button>
                <Button basic color='red' onClick={() => setConfirmOpen(true)}>
                  削除
                </Button>
                <Confirm
                  content='削除しますか？'
                  confirmButton='削除する'
                  cancelButton='キャンセル'
                  open={isConfirmOpen}
                  onCancel={() => setConfirmOpen(false)}
                  onConfirm={() => setConfirmOpen(false)}
                />
              </div>
            </Card.Content>
          </Card>
          )}
        )}
      </Card.Group>
      <div style={{ height: '30px' }}/>
      <Form author={editingAuthor} />
    </div>
  );
}
