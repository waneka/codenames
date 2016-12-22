defmodule Codenames.Game do
  use GenServer

  def start_link(room) do
    GenServer.start_link(
      __MODULE__,
      [],
      name: via_tuple(room)
    )
  end

  def shutdown(room) do
    GenServer.stop(via_tuple(room), :shutdown)
  end

  def read(room) do
    GenServer.call(via_tuple(room), :read)
  end

  def stop(room) do
    GenServer.stop(via_tuple(room))
  end

  def whereis(room) do
    GenServer.whereis(via_tuple(room))
  end

  defp via_tuple(room) do
    key = {:game, room}
    {:via, :gproc, {:n, :l, key}}
  end

  def handle_call(:read, _, state) do
    {:reply, state, state}
  end
end
