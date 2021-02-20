import React, { useState } from 'react';
import { Button, Card, Icon, Confirm } from 'semantic-ui-react'

import { AuthorForm as Form } from './Form';
import { Author } from '../types/author';
import { Book } from '../types/book';

const authors = [
  {
    id: 1,
    first_name: "佐藤",
    last_name: "太郎",
    books_attributes: [
      {
        id: 1,
        name: "本の名前",
        _destroy: false
      }
    ]
  },
  {
    id: 2,
    first_name: "田中",
    last_name: "次郎",
    books_attributes: [
      {
        id: 2,
        name: "本の名前",
        _destroy: false
      }
    ]
  },
  {
    id: 3,
    first_name: "鈴木",
    last_name: "一郎",
    books_attributes: [
      {
        id: 3,
        name: "本の名前",
        _destroy: false,
      }
    ]
  },
]

const defaultAuthor: Author = {
  id: 0,
  first_name: '',
  last_name: '',
  books_attributes: [
    {
      id: 0,
      name: '',
      _destroy: false,
    }
  ]
}

export const Authors = () => {
  const [editingAuthor, setEditingAuthor] = useState(defaultAuthor);
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const addAuthorBookForm = () => {
    setEditingAuthor({
      ...editingAuthor,
      books_attributes: [
        ...editingAuthor.books_attributes,
        {
          name: '',
          _destroy: false,
        }
      ],
    });
  }

  const removeAuthorBookForm = () => {
    setEditingAuthor({
      ...editingAuthor,
      books_attributes: [
        ...editingAuthor.books_attributes.slice(0, -1),
        {
          ...editingAuthor.books_attributes.slice(-1)[0],
          _destroy: true,
        }
      ],
    });
  }

  return (
    <div style={{ padding: '24px', width: '1400px' }}>
      <Card.Group>
        {authors.map((author, i) => (
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
        ))}
      </Card.Group>
      <div style={{ height: '30px' }}/>
      <Form author={editingAuthor} addBookFormHandleClick={addAuthorBookForm} removeBookFormHandleClick={removeAuthorBookForm} handleChange={setEditingAuthor} />
    </div>
  );
}
