export interface AllowedUser {
  email: string
  name: string
  building: string
  unit: string
  role: 'admin' | 'propietario' | 'cd'
}

export const allowedUsers: AllowedUser[] = [
  {
    email: 'federico@ayalaestudio.com.uy',
    name: 'Federico Ayala',
    building: 'Chesterfield Tower',
    unit: 'Admin',
    role: 'admin',
  },
  {
    email: 'info@ayalaestudio.com.uy',
    name: 'Rocío Ayala',
    building: 'Chesterfield Tower',
    unit: 'Admin',
    role: 'admin',
  },
  // Agregar propietarios aquí:
  // {
  //   email: 'propietario@gmail.com',
  //   name: 'Nombre Apellido',
  //   building: 'Chesterfield Tower',
  //   unit: '101',
  //   role: 'propietario',
  // },
]
