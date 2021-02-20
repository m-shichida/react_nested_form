import React, { useState } from 'react';
import { Button, Card, Icon, Confirm } from 'semantic-ui-react'

import { AuthorForm as Form } from './Form';
import { Author } from '../types/author';

const authors = [
  {
    id: 1,
    firstName: "佐藤",
    lastName: "太郎",
    booksAttributes: [
      {
        id: 1,
        name: "本の名前",
        _destroy: false
      }
    ]
  },
  {
    id: 2,
    firstName: "田中",
    lastName: "次郎",
    booksAttributes: [
      {
        id: 2,
        name: "本の名前",
        _destroy: false
      }
    ]
  },
  {
    id: 3,
    firstName: "鈴木",
    lastName: "一郎",
    booksAttributes: [
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
  firstName: '',
  lastName: '',
  booksAttributes: []
}

export const Authors = () => {
  const [editingAuthor, setEditingAuthor] = useState(defaultAuthor);
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  return (
    <div style={{ padding: '24px', width: '1400px' }}>
      <Card.Group>
        {authors.map((author, i) => (
          <Card key={author.id || i}>
            <Card.Content style={{ display: 'flex' }}>
              <div>
                <Card.Header>{author.firstName} {author.lastName}</Card.Header>
                <Card.Meta>書籍一覧</Card.Meta>
                <Card.Description>
                  <ul style={{ paddingLeft: '20px', margin: '4px 0' }}>
                    {author.booksAttributes.map((book, i) => (
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
      <Form author={editingAuthor} />
    </div>
  );
}
