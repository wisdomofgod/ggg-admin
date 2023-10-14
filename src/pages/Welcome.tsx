import { PageContainer } from '@ant-design/pro-components';
import { Card, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { StatisticCard } from '@ant-design/pro-components';
import { getDashboardInfo } from '@/services/ant-design-pro/admin';
import styles from './Welcome.less';

const { Statistic, Divider } = StatisticCard;

const parseRatio = (v: number) => {
  return `${(v * 100).toFixed(2)}%`;
};

const Welcome: React.FC = () => {
  const [data, setData] = useState({
    all_invite_user: 0,
    all_invite_orders: 0,
    lm_invite_orders: 0,
    lm_invite_user: 0,
    all_order_price: 0,
    lm_order_price: 0,
    lm_user_ratio: '-',
    history_user_ratio: '-',
    lm_order_ratio: '-',
    history_order_ratio: '-',
  });
  useEffect(() => {
    getDashboardInfo({}).then((res) => {
      setData({
        ...res.data,
        lm_user_ratio: parseRatio(res.data.lm_invite_user / res.data.all_invite_user),
        history_user_ratio: parseRatio(
          (res.data.all_invite_user - res.data.lm_invite_user) / res.data.all_invite_user,
        ),
        lm_order_ratio: parseRatio(res.data.lm_invite_orders / res.data.all_invite_orders),
        history_order_ratio: parseRatio(
          (res.data.all_invite_orders - res.data.lm_invite_orders) / res.data.all_invite_orders,
        ),
      });
    });
  }, []);

  return (
    <PageContainer>
      <Card>
        <StatisticCard.Group direction={'row'}>
          <StatisticCard
            statistic={{
              title: '总邀请注册用户数',
              value: data.all_invite_user,
            }}
          />
          <Divider type={'horizontal'} />
          <StatisticCard
            statistic={{
              title: '上月邀请注册用户数',
              value: data.lm_invite_user,
              description: <Statistic title="占比" value={data.lm_user_ratio} />,
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/ShNDpDTik/huan.svg"
                alt="百分比"
                width="100%"
              />
            }
            chartPlacement="left"
          />
          <StatisticCard
            statistic={{
              title: '历史邀请注册用户数',
              value: data.all_invite_user - data.lm_invite_user,
              description: <Statistic title="占比" value={data.history_user_ratio} />,
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/6YR18tCxJ/huanlv.svg"
                alt="百分比"
                width="100%"
              />
            }
            chartPlacement="left"
          />
        </StatisticCard.Group>
        <hr />
        <StatisticCard.Group direction={'row'}>
          <StatisticCard
            statistic={{
              title: '总订单数',
              description: `订单金额：${data.all_order_price}`,
              value: data.all_invite_orders,
            }}
          />
          <Divider type={'horizontal'} />
          <StatisticCard
            statistic={{
              title: '上月订单数',
              value: data.lm_invite_orders,
              description: (
                <>
                  <div>订单金额：{data.lm_order_price}</div>
                  <Statistic title="占比" value={data.lm_order_ratio} />
                </>
              ),
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/ShNDpDTik/huan.svg"
                alt="百分比"
                width="100%"
              />
            }
            chartPlacement="left"
          />
          <StatisticCard
            statistic={{
              title: '历史订单数',
              value: data.all_invite_orders - data.lm_invite_orders,
              description: (
                <>
                  <div>订单金额：{(data.all_order_price - data.lm_order_price).toFixed(2)}</div>
                  <Statistic title="占比" value={data.history_order_ratio} />
                </>
              ),
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/6YR18tCxJ/huanlv.svg"
                alt="百分比"
                width="100%"
              />
            }
            chartPlacement="left"
          />
        </StatisticCard.Group>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
