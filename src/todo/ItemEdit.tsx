import React, { useContext, useEffect, useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCheckbox, IonDatetime, IonLabel
} from '@ionic/react';
import { getLogger } from '../core';
import { ItemContext } from './ItemProvider';
import { RouteComponentProps } from 'react-router';
import { ItemProps } from './ItemProps';

const log = getLogger('ItemEdit');

interface ItemEditProps extends RouteComponentProps<{
  id?: string;
}> {}

const ItemEdit: React.FC<ItemEditProps> = ({ history, match }) => {
  const { items, saving, savingError, saveItem } = useContext(ItemContext);

  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [orderDate, setDate] = useState('');
  const [negotiable, setNegotiable] = useState(false);

  const [item, setItem] = useState<ItemProps>();
  useEffect(() => {
    log('useEffect');
    const routeId = match.params.id || '';
    const item = items?.find(it => it.id === routeId);
    setItem(item);
    if (item) {
      setDescription(item.description);
      setPrice(item.price);
      setDate(item.orderDate);
      setNegotiable(item.negotiable);
    }
  }, [match.params.id, items]);
  const handleSave = () => {
    const editedItem = item ? { ...item, description, price,orderDate,negotiable } : { description, price, orderDate, negotiable };
    saveItem && saveItem(editedItem).then(() => history.goBack());
  };
  log('render');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSave}>
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLabel>Enter Description:</IonLabel>
        <IonInput value={description} placeholder={"enter description"} onIonChange={e => setDescription(e.detail.value || '')} />
        <IonLabel>Enter price: </IonLabel>
        <IonInput value={price} placeholder={"enter price"} onIonChange={e => setPrice(parseInt(e.detail.value!,10) || 0)} />
        <IonLabel>Chose Date and Time: </IonLabel>
        <IonDatetime value={orderDate} placeholder ={"Chose date and time"} displayFormat={"YYYY-MM-DD"} onIonChange={e => setDate(e.detail.value!)}/>
        <IonLabel>Negotiable: </IonLabel>
        <IonCheckbox checked={negotiable} onIonChange={e => setNegotiable( e.detail.checked || false)} />
        <IonLoading isOpen={saving} />
        {savingError && (
          <div>{savingError.message || 'Failed to save item'}</div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ItemEdit;
