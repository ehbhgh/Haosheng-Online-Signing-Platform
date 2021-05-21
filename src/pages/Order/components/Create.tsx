import React, { Fragment, useEffect,useState} from 'react';
import { Card, Avatar, Skeleton, Modal, message } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { getOrdersDetail } from '@/services/order';
const { Meta } = Card;
const Create = (props: any) => {
  const [res,setRes]=useState({})
  const { handleCancel, isModalVisible, id } = props;
  useEffect(() => {
    getDetail();
  }, []);
  const getDetail = async () => {
    let res = await getOrdersDetail(id);
    setRes({...res})

    
  };
  return (
    <Fragment>
      <Modal
        title="订单详情"
        visible={isModalVisible}
        onCancel={() => handleCancel(false)}
        footer={null}
        destroyOnClose={true}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        {JSON.stringify(res)!=='{}' ? (
          <Card
          >
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={res.address_id}
              description="This is the description"
            />
          </Card>
        ) : (
          <Skeleton avatar paragraph={{ rows: 4 }} />
        )}
      </Modal>
    </Fragment>
  );
};

export default Create;
