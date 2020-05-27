export const jsonData = list => {
  return list.members.map(member => {
    const obj = {};

    member.info.forEach((info, index) => {
      const field = list.fields[index].toUpperCase();
      obj[field] = info;
    });

    return obj;
  });
};
