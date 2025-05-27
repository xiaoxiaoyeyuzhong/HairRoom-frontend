declare namespace API {
  type AliPayRefund = {
    outTradeNo?: string;
    refundAmount?: number;
    refundReason?: string;
    tradeNo?: string;
  };

  type AutoScheduleRequest = {
    appointSlots?: number;
    storeId?: number;
  };

  type BaseResponseBill = {
    code?: number;
    data?: Bill;
    message?: string;
  };

  type BaseResponseboolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseListPost = {
    code?: number;
    data?: Post[];
    message?: string;
  };

  type BaseResponseListUserVO = {
    code?: number;
    data?: UserVO[];
    message?: string;
  };

  type BaseResponselong = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageBillVO = {
    code?: number;
    data?: PageBillVO;
    message?: string;
  };

  type BaseResponsePagePost = {
    code?: number;
    data?: PagePost;
    message?: string;
  };

  type BaseResponsePageStaffVO = {
    code?: number;
    data?: PageStaffVO;
    message?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    message?: string;
  };

  type BaseResponsePost = {
    code?: number;
    data?: Post;
    message?: string;
  };

  type BaseResponseStaff = {
    code?: number;
    data?: Staff;
    message?: string;
  };

  type BaseResponsestring = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type Bill = {
    billAmount?: number;
    billDesc?: string;
    billName?: string;
    billType?: string;
    createTime?: string;
    customerId?: number;
    id?: number;
    isDelete?: number;
    outTradeNo?: string;
    paySituation?: number;
    staffId?: number;
    tradeNo?: string;
    updateTime?: string;
  };

  type BillAddRequest = {
    billAmount?: number;
    billDesc?: string;
    billName?: string;
    billType?: string;
    customerId?: number;
    staffId?: number;
  };

  type BillQueryRequest = {
    billAmount?: number;
    billDesc?: string;
    billName?: string;
    billType?: string;
    current?: number;
    customerId?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    staffId?: number;
    tradeNo?: string;
  };

  type BillUpdateRequest = {
    billAmount?: number;
    billDesc?: string;
    billName?: string;
    billType?: string;
    customerId?: number;
    id?: number;
    staffId?: number;
  };

  type BillVO = {
    billAmount?: number;
    billDesc?: string;
    billName?: string;
    billType?: string;
    createTime?: string;
    customerId?: number;
    id?: number;
    staffId?: number;
    tradeNo?: string;
    updateTime?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getAvatarUsingGETParams = {
    /** avatarUrl */
    avatarUrl?: string;
  };

  type getBillByIdUsingPOSTParams = {
    /** id */
    id?: number;
  };

  type getPostByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getStaffByIdUsingPOSTParams = {
    /** id */
    id?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type listPostByPageUsingGETParams = {
    age?: number;
    contact?: string;
    content?: string;
    current?: number;
    education?: string;
    gender?: number;
    job?: string;
    loveExp?: string;
    pageSize?: number;
    place?: string;
    reviewStatus?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type listPostUsingGETParams = {
    age?: number;
    contact?: string;
    content?: string;
    current?: number;
    education?: string;
    gender?: number;
    job?: string;
    loveExp?: string;
    pageSize?: number;
    place?: string;
    reviewStatus?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageBillVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: BillVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePost = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Post[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageStaffVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: StaffVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type Post = {
    age?: number;
    contact?: string;
    content?: string;
    createTime?: string;
    education?: string;
    gender?: number;
    id?: number;
    isDelete?: number;
    job?: string;
    loveExp?: string;
    photo?: string;
    place?: string;
    reviewMessage?: string;
    reviewStatus?: number;
    thumbNum?: number;
    updateTime?: string;
    userId?: number;
    viewNum?: number;
  };

  type PostAddRequest = {
    age?: number;
    contact?: string;
    content?: string;
    education?: string;
    gender?: number;
    job?: string;
    loveExp?: string;
    photo?: string;
    place?: string;
  };

  type PostUpdateRequest = {
    age?: number;
    contact?: string;
    content?: string;
    education?: string;
    gender?: number;
    id?: number;
    job?: string;
    loveExp?: string;
    photo?: string;
    place?: string;
    reviewMessage?: string;
    reviewStatus?: number;
  };

  type Staff = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    isStoreManager?: number;
    staffAge?: number;
    staffEmail?: string;
    staffName?: string;
    staffPhone?: string;
    staffSex?: string;
    storeId?: number;
    updateTime?: string;
    userId?: number;
  };

  type StaffAddRequest = {
    id?: number;
    isStoreManager?: number;
    staffAge?: number;
    staffEmail?: string;
    staffName?: string;
    staffPhone?: string;
    staffSex?: string;
    storeId?: number;
  };

  type StaffQueryRequest = {
    current?: number;
    id?: number;
    isStoreManager?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    staffAge?: number;
    staffEmail?: string;
    staffName?: string;
    staffPhone?: string;
    staffSex?: string;
    storeId?: number;
    userId?: number;
  };

  type StaffUpdateRequest = {
    id?: number;
    isStoreManager?: number;
    staffAge?: number;
    staffEmail?: string;
    staffName?: string;
    staffPhone?: string;
    staffSex?: string;
    storeId?: number;
  };

  type StaffVO = true;

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    createTime?: string;
    current?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };
}
