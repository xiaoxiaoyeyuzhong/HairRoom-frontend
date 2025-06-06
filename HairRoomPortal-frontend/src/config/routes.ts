import Index from "../pages/Index.vue"
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpatePage.vue";
import UserPage from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import EditUserPage from "../pages/EditUserPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import SchedulePage from "../pages/SchedulePage.vue";
import AppointmentPage from "../pages/AppointmentPage.vue";
import UserAppointmentPage from "../pages/UserAppointmentPage.vue";
import ScheduleUpdatePage from "../pages/ScheduleUpdatePage.vue";
import UserStaffEvaluationPage from "../pages/UserStaffEvaluationPage.vue";
import StaffEvaluationDetailsPage from "../pages/StaffEvaluationDetailsPage.vue";


const routes = [
    {path: '/', component: Index},
    {path: '/AppointmentPage', title: '预约', component: AppointmentPage},
    {path: '/SchedulePage', title: '排班', component: SchedulePage},
    {path: '/SchedulePage/ScheduleUpdatePage', title: '更新排班', component: ScheduleUpdatePage},
    {path: '/TeamPage/TeamAddPage', title: '创建队伍', component: TeamAddPage},
    {path: '/TeamPage/TeamUpdatePage', title: '更新队伍', component: TeamUpdatePage},
    {path: '/UserPage', title: '个人信息', component: UserPage},
    {path: '/UserPage/EditUserPage', title: '编辑个人信息', component: EditUserPage},
    {path: '/UserPage/SearchResultPage', title: '搜索结果页', component: SearchResultPage},
    {path: '/UserPage/UserLoginPage', title: '用户登录', component: UserLoginPage},
    {path: '/UserPage/UserUpdatePage', title: '更新个人信息', component: UserUpdatePage},
    {path: '/UserPage/UserAppointmentPage', title: '已预约列表', component: UserAppointmentPage},
    {path: '/UserPage/UserStaffEvaluationPage', title: '我的评价', component: UserStaffEvaluationPage},
    {path: '/UserPage/StaffEvaluationDetailsPage', title: '评价修改', component: StaffEvaluationDetailsPage},


]

export default routes