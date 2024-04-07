import { defineComponent } from 'vue';

import Skeleton from 'primevue/skeleton';

import { useStore } from 'effector-vue/composition';

import { $userOverview } from '@entities/user-overview';

import { DashboardInfo } from '@ui/dashboard-info';

import { useDashboardInfo } from '../lib';

type Props = {
  isLoading: boolean;
};

type Emits = {
  click: (key: string) => void;
};

export const UserDashboardMessages = defineComponent<Props, Emits>(
  (props, { emit }) => {
    const userOverview = useStore($userOverview);

    const { dashboardInfo } = useDashboardInfo();

    const handleClick = (key: string) => (event: MouseEvent) => {
      event.stopPropagation();
      emit('click', key);
    };

    return () => (
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardInfo.value.map((info) =>
          !userOverview.value || props.isLoading ? (
            <Skeleton key={info.key} height="3rem" />
          ) : (
            <DashboardInfo
              key={info.key}
              icon={info.icon}
              onClick={handleClick(info.key)}
            >
              {info.text}
            </DashboardInfo>
          )
        )}
      </div>
    );
  },
  { props: ['isLoading'] }
);
