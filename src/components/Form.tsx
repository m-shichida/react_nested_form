import React, { useState, useEffect } from 'react';
import { Form, Button, Header as Heading, InputOnChangeData } from 'semantic-ui-react'

import { Author } from '../types/author';
import { Book } from '../types/book';

export const AuthorForm = ({ author }: { author: Author }) => {
  const [firstName, setFirstName] = useState(author.first_name);
  const [lastName, setLastName] = useState(author.last_name);
  const [booksAttributes, setBooksAttributes] = useState(author.books_attributes);

  useEffect(() => {
    setFirstName(author.first_name);
    setLastName(author.last_name);
    setBooksAttributes(author.books_attributes);
  }, [author])

  const addBooksAttributes = () => {
    setBooksAttributes([
      ...booksAttributes,
      {
        name: '',
        _destroy: false,
      }
    ])
  }

  const editBooksAttributes = (key: number, name: string) => {
    let result: Book[] = [];

    booksAttributes.map((booksAttribute, index) => {
      if (key === index) {
        result.push({ ...booksAttribute, name: name })
      } else {
        result.push(booksAttribute);
      }
    });

    setBooksAttributes(result);
  }

  const removeBooksAttributes = (key: number) => {
    let result: Book[] = [];

    booksAttributes.map((booksAttribute, index) => {
      if (key === index) {
        result.push({ ...booksAttribute, _destroy: true });
      } else {
        result.push(booksAttribute);
      }
    });

    setBooksAttributes(result);
  }

  return (
    <Form style={{ width: '400px' }}>
      <input type='hidden' value={author.id} />
      <Form.Group widths='equal'>
        <Form.Input fluid label='姓' placeholder='姓' value={firstName} onChange={(_, data: InputOnChangeData) => setFirstName(data.value)} />
        <Form.Input fluid label='名' placeholder='名' value={lastName} onChange={(_, data: InputOnChangeData) => setLastName(data.value)} />
      </Form.Group>
      <div style={{ display: 'flex' }}>
        <Heading as='h2'>書籍一覧</Heading>
        <span>
          <Button
            circular
            color='blue'
            size='tiny'
            style={{ marginLeft: '5px' }}
            onClick={() => addBooksAttributes()}
          >
            追加
          </Button>
        </span>
      </div>
      <div>
        {booksAttributes.map((book, i) => (
          <div key={i} style={{ display: book._destroy ? 'none' : 'flex', justifyContent: 'space-around' }}>
            <Form.Input style={{ width: '350px' }} placeholder='書籍名' value={book.name} onChange={(_, data: InputOnChangeData) => editBooksAttributes(i, data.value)} />
            <span>
              <Button
                circular
                icon='minus'
                color='red'
                size='mini'
                style={{ verticalAlign: '-8px' }}
                onClick={() => removeBooksAttributes(i)}
              />
            </span>
          </div>
        ))}
      </div>
      <Button color='blue' floated='right'>
        送信
      </Button>
    </Form>
  );
}
