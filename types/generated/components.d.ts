import type { Schema, Struct } from '@strapi/strapi';

export interface OrderedItemOrderedItem extends Struct.ComponentSchema {
  collectionName: 'components_ordered_item_ordered_items';
  info: {
    displayName: 'OrderedItem';
  };
  attributes: {
    price: Schema.Attribute.Integer;
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
    quantity: Schema.Attribute.Integer;
  };
}

export interface ProductInfoProductInfo extends Struct.ComponentSchema {
  collectionName: 'components_product_info_product_infos';
  info: {
    displayName: 'ProductInfo';
  };
  attributes: {
    Des: Schema.Attribute.Text;
    Key: Schema.Attribute.String;
    Value: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'ordered-item.ordered-item': OrderedItemOrderedItem;
      'product-info.product-info': ProductInfoProductInfo;
    }
  }
}
