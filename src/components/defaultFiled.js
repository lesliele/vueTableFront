export default [
    {
      name: 'userImg',
      title: '用户头像',
      formatter(value) {
        return `<img src="${value}" style="width: 100px;"/>`
      }
    },
    {   
        name: 'age',
        title: '年龄',
        sortField: 'age'
    },
    {
        name: 'address.fax',
        title: '传真'
    },
    {
        name: 'address.mobile',
        title: '手机号码'
    },
    {
      name: 'birthDate',
      title: '生日',
      sortField: 'birthDate',
      formatter(value) {
        let times = new Date(value);
        return String(times.getFullYear()) + '-' + String(times.getMonth() + 1) + '-' + String(times.getDate());
      }
    },
    {
      name: 'email',
      title: '邮箱'
    },
    {
      name: 'gender',
      title: '性别',
      formatter(value) {
        return Number(value) === 1 ? '男' : '女'
      }
    },
    {
      name: 'name',
      title: '姓名'
    },
    {
      name: 'admin-slot',
      title: '是否为管理员'
    }
]