import React from 'react';
import {IonCheckbox, IonItem, IonLabel} from '@ionic/react';
import { ItemProps } from './ItemProps';

interface ItemPropsExt extends ItemProps {
  onEdit: (id?: string) => void;
}

const Item: React.FC<ItemPropsExt> = ({ id, description,price,orderDate,negotiable, onEdit }) => {
    let splitDate = orderDate.split("T",1);
    return (
    <IonItem onClick={() => onEdit(id)}>
      <IonLabel>Description: {description}</IonLabel>
      <IonLabel>Price: {price}</IonLabel>
      <IonLabel>Date: {splitDate} </IonLabel>
        Negotiable:
        <IonItem><IonCheckbox checked={negotiable}>{negotiable}</IonCheckbox></IonItem>
    </IonItem>
  );
};

export default Item;
